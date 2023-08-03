import { Injectable } from '@nestjs/common';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class IngredientValidator {
  private tableName = 'Ingredients';
  constructor(private readonly dynamo: DynamoService) {}
  async validate(ingredients: string[], batchSize = 5) {
    const notFoundIngredients: string[] = [];

    for (let i = 0; i < ingredients.length; i += batchSize) {
      const batch = ingredients.slice(i, i + batchSize);
      const promises = batch.map((ingredientId) => {
        const params: GetCommandInput = {
          TableName: this.tableName,
          Key: {
            id: ingredientId,
          },
        };

        return this.dynamo.client.send(new GetCommand(params));
      });

      const results = await Promise.all(promises);

      results.forEach((result, index) => {
        const item = result.Item as Ingredient;
        if (!item) {
          return notFoundIngredients.push(batch[index]);
        }
      });
    }

    if (notFoundIngredients.length > 0) {
      throw new Error(notFoundIngredients.join(''));
    }
  }
}
