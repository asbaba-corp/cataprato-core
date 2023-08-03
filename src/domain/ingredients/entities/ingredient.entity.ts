import { randomUUID } from 'crypto';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';

export class Ingredient {
  id: string;
  private constructor(private readonly ingredient: CreateIngredientDto) {
    this.id = randomUUID();
  }

  static build(ingredient: CreateIngredientDto) {
    return new Ingredient(ingredient);
  }
}
