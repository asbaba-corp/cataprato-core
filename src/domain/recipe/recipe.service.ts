import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './repositories/ingredients.repository';
import { Recipe } from './entities/recipe.entity';
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
    const newIngredient = Recipe.build(payload);
    const ingredient = await this.recipeRepository.create(newIngredient);

    return ingredient;
  }

  async findAll() {
    const ingredients = await this.recipeRepository.findAll();
    return ingredients;
  }

  async findOne(id: string) {
    const ingredient = await this.recipeRepository.findOne(id);
    return ingredient;
  }
}
