import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll() {
    return await this.recipeService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.recipeService.findOne(id);
  }

  @Post()
  create(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.create(recipe);
  }
}
