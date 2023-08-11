import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from './repositories/recipe.repository';
import { IngredientValidator } from './validators/ingredient.validator';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository, IngredientValidator],
})
export class RecipeModule {}
