import { Module } from '@nestjs/common';
import { SearchRecipeService } from './search-recipe.service';
import { SearchRecipeController } from './search-recipe.controller';
import { RecipeRepository } from './repository/recipe.repository';

@Module({
  controllers: [SearchRecipeController],
  providers: [SearchRecipeService, RecipeRepository],
})
export class SearchRecipeModule {}
