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

    return recipes.map(this.deserializeRecipe);
  }
  private deserializeRecipe(data: any) {
    return {
      id: data.id.S,
      name: data.recipe.M.name.S,
      ingredient: data.recipe.M.ingredients.L.map((item: any) => item.S),
      creator: data.recipe.M.creator.S,
    };
  }
}
