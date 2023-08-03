import { randomUUID } from 'crypto';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

export class Recipe {
  id: string;
  ingredients: Ingredient[];
  creator: string;
  private constructor(private readonly recipe: CreateRecipeDto) {
    this.id = randomUUID();
  }

  static build(recipe: CreateRecipeDto) {
    return new Recipe(recipe);
  }
}
