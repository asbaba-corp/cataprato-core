import { randomUUID } from 'crypto';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

export class RecipeEntity {
  id: string;
  ingredients: string[];
  name: string;
  creator: string;
  createdAt?: Date
  private constructor(private readonly recipe: CreateRecipeDto) {
    this.id = randomUUID();
    Object.assign(this, recipe);
  }

  static build(recipe: CreateRecipeDto) {
    return new RecipeEntity(recipe);
  }
}

export type Recipe = RecipeEntity;
