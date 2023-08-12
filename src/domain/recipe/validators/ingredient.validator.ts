import { Injectable } from '@nestjs/common';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
@Injectable()
export class IngredientValidator {
  private tableName = 'Ingredients';
  constructor(private readonly dynamo: DynamoService) {}
  async validate(ingredients: string[], batchSize = 5) {
    const conditions = ingredients
      .map((ingredient) => `contains(ingredients, '${ingredient}')`)
      .join(' AND ');

    const parameters = ingredients.map((ingredient) => ({ S: ingredient }));

    const statement = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;

    const result = await this.dynamo.client.send(
      new ExecuteStatementCommand({
        Statement: statement,
        Parameters: parameters,
      }),
    );
    console.log(result);
  }
}
