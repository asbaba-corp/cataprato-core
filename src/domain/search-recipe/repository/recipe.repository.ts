import { ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import { DynamoService } from '../../../database/dynamodb/dynamo.service';
import { Injectable } from '@nestjs/common';
import { SearchRecipesFilters } from '../dto/search-recipe-query.dto';

@Injectable()
export class RecipeRepository {
  tableName = 'Recipes';
  constructor(private readonly dynamo: DynamoService) {}

  async findRecipeByIngredientsId(
    ingredients: string[],
    filters?: SearchRecipesFilters,
  ) {
    const logicalOperator = filters?.includes ? ' AND ' : ' OR ';

    const conditions = ingredients
      .map((ingredient) => `contains(ingredients, '${ingredient}')`)
      .join(logicalOperator);

    const parameters = ingredients.map((ingredient) => ({ S: ingredient }));

    const statement = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;

    console.log(statement);
    const allRecipes = await this.dynamo.client.send(
      new ExecuteStatementCommand({
        Statement: statement,
        Parameters: parameters,
      }),
    );

    return allRecipes.Items;
  }
}
