import { Injectable } from '@nestjs/common';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';
import PQueue from 'p-queue';

@Injectable()
export class IngredientValidator {
  tableName = 'Ingredients';
  constructor(private readonly dynamo: DynamoService) {}
  async validate(ingredients: string[], batchSize = 5) {
    const notFoundIngredients: string[] = [];
    const queue = new PQueue({ concurrency: batchSize });

    await Promise.all(
      ingredients.map((ingredientId) =>
        queue.add(async () => {
          const params: GetCommandInput = {
            TableName: this.tableName,
            Key: { id: ingredientId },
          };

          const result = await this.dynamo.client.send(new GetCommand(params));
          const item = result.Item as Ingredient;
          if (!item) {
            notFoundIngredients.push(ingredientId);
          }
        }),
      ),
    );

    if (notFoundIngredients.length > 0) {
      throw new Error(
        `Ingredients not found: ${notFoundIngredients.join(', ')}`,
      );
    }
  }
}
