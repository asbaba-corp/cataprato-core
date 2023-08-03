import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientsRepository } from './repositories/ingredients.repository';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientsRepository],
})
export class IngredientModule {}
