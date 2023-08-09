import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { Injectable } from '@nestjs/common';
import { mapToObject } from '../../../common/transformers';
import {
  SearchRecipeQueryDTO,
  SearchRecipesFilters,
} from '../dto/search-recipe-query.dto';

@Injectable()
export class RecipeRepository {
  tableName = 'Recipes';
  constructor(private readonly dynamo: DynamoService) {}

  async findRecipeByIngredientsId(
    ingredients: string[],
    filters?: SearchRecipesFilters,
  ) {
    const expAttributeValues = new Map();
    const filterExpression = ingredients.map((id, index) => {
      const key = `:ingredient${index}`;
      expAttributeValues.set(key, { S: id });
      return `contains(recipe.ingredients, ${key})`;
    });
    const conditionalExpression = ` ${filters?.includes ? ' AND ' : ' OR '} `;
    const allRecipes = await this.dynamo.client.send(
      new ScanCommand({
        TableName: this.tableName,
        FilterExpression: filterExpression.join(conditionalExpression),
        ExpressionAttributeValues: mapToObject(expAttributeValues),
      }),
    );
    return allRecipes.Items;
  }
}
