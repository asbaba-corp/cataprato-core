import { randomUUID } from 'crypto';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

export class Recipe {
  id: string;
  private constructor(private readonly recipe: CreateRecipeDto) {
    this.id = randomUUID();
  }

  static build(recipe: CreateRecipeDto) {
    return new Recipe(recipe);
  }
}
