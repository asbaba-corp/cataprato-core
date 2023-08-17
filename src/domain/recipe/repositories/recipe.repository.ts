import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { Recipe } from '../entities/recipe.entity';
import { ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

interface DynamoDbRecipe {
  id: {
    S: string;
  };
  creator_id: {
    S: string;
  };
  name: {
    S: string;
  };
  ingredients: Set<string>;
  created_at: {
    S: string
  }
}

@Injectable()
export class RecipeRepository {
  tableName = 'Recipes';
  constructor(private readonly dynamo: DynamoService) {}

  async findAll() {
    try {
      const result = await this.dynamo.client.send(
        new ScanCommand({
          TableName: this.tableName,
        }),
      );
      return result.Items.map(this.deserializeRecipeFromDynamodbFormat);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async create(recipe: Recipe) {
    const params = {
      TableName: this.tableName,
      Item: this.serializeRecipeToDynamodbFormat(recipe),
    };
    const command = new PutItemCommand(params);

    return this.dynamo.client.send(command);
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

  private serializeRecipeToDynamodbFormat(recipe: Recipe) {
    return {
      id: {
        S: recipe.id,
      },
      creator_id: {
        S: recipe.creator,
      },
      ingredients: {
        SS: [...recipe.ingredients],
      },
      name: {
        S: recipe.name,
      },
      created_at: {
        S: recipe.createdAt.toISOString()
      }
    };
  }

  private deserializeRecipeFromDynamodbFormat(dynamoRecipe: DynamoDbRecipe) {
    return {
        id: dynamoRecipe.id.S,
        creator: dynamoRecipe.creator_id.S,
        ingredients: [...dynamoRecipe.ingredients],
        name: dynamoRecipe.name.S,
        createdAt: dynamoRecipe.created_at
          
    };
}
}
