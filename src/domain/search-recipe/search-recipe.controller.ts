import { Controller, Get, Query } from '@nestjs/common';
import { SearchRecipeService } from './search-recipe.service';
import { SearchRecipeQueryDTO } from './dto/search-recipe-query.dto';

@Controller('search-recipe')
export class SearchRecipeController {
  constructor(private readonly searchRecipeService: SearchRecipeService) {}

  @Get('')
  async getRecipeByIngredients(
    @Query()
    query: SearchRecipeQueryDTO,
  ) {
    const { ingredients, filters } = query;
    return this.searchRecipeService.getRecipeByIngredients(
      ingredients,
      filters,
    );
  }
}
