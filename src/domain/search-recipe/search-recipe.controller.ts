import { Controller, Get, Query } from '@nestjs/common';
import { SearchRecipeService } from './search-recipe.service';
import { SearchRecipeQueryDTO } from './dto/search-recipe-query.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('search-recipe')
@Controller('search-recipe')
export class SearchRecipeController {
  constructor(private readonly searchRecipeService: SearchRecipeService) {}

  @ApiQuery({ name: 'role', type: SearchRecipeQueryDTO })
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
