import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './repository/recipe.repository';
import { SearchRecipesFilters } from './dto/search-recipe-query.dto';

@Injectable()
export class SearchRecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}
  async getRecipeByIngredients(
    ingredients: string[],
    filters?: SearchRecipesFilters,
  ) {
    const recipes = await this.recipeRepository.findRecipeByIngredientsId(
      ingredients,
      filters,
    );

    return recipes;
  }
  private deserializeRecipe(data: any) {
    return {
      id: data.id.S,
      name: data.name.S,
      ingredient: data.ingredients.SS.map((item: any) => item),
      creator: data.creator.S,
    };
  }
}
