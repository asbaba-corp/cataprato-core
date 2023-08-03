import { Body, Controller, Get, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async findAll() {
    return await this.ingredientsService.findAll();
  }

  @Post('')
  create(@Body() ingredient: CreateIngredientDto) {
    return this.ingredientsService.create(ingredient);
  }
}
