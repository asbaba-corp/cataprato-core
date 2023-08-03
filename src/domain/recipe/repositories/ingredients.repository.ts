import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { Recipe } from '../entities/recipe.entity';
import { ScanCommand, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class RecipeRepository {
  tableName = 'Recipe';
  constructor(private readonly dynamo: DynamoService) {}

  async findAll() {
    try {
      const result = await this.dynamo.client.send(
        new ScanCommand({
          TableName: this.tableName,
        }),
      );
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async create(recipe: Recipe) {
    const result = await this.dynamo.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: { ...recipe },
      }),
    );

    return result;
  }

  async findOne(id: string) {
    const result = await this.dynamo.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
    return result.Item;
  }
}
