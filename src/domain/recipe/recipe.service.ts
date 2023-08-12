import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './repositories/recipe.repository';
import { RecipeEntity } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { IngredientValidator } from './validators/ingredient.validator';

@Injectable()
export class RecipeService {
  constructor(
    private recipeRepository: RecipeRepository,
    private ingredientValidator: IngredientValidator,
  ) {}

  async create(payload: CreateRecipeDto) {
    await this.ingredientValidator.validate(payload.ingredients);
    const newRecipe = RecipeEntity.build(payload);
    const recipe = await this.recipeRepository.create(newRecipe);

    return recipe;
  }

  async findAll() {
    const recipes = await this.recipeRepository.findAll();
    return recipes;
  }

  async findOne(id: string) {
    const recipe = await this.recipeRepository.findOne(id);
    return recipe;
  }
}
