import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoService } from '../../database/dynamodb/dynamo.service';
import { Ingredient } from '../entities/ingredient.entity';
import { QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class IngredientsRepository {
  tableName = 'ingredients';
  constructor(private readonly dynamo: DynamoService) {}

  async findAll() {
    try {
      const result = await this.dynamo.client.send(
        new QueryCommand({
          TableName: this.tableName,
        }),
      );

      return result;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async create(ingredient: Ingredient) {
    const result = await this.dynamo.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: { ...ingredient },
      }),
    );

    return result;
  }
}
