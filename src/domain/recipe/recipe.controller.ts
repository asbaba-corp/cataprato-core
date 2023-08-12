import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll() {
    return await this.recipeService.findAll();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.recipeService.findOne(id);
  }

  @ApiBody({ type: CreateRecipeDto })
  @Post()
  async create(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.create(recipe);
  }
}
