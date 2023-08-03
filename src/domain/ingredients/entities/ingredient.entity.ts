import { randomUUID } from 'crypto';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';

export class Ingredient {
  id: string;
  name: string;
  private constructor(private readonly ingredient: CreateIngredientDto) {
    this.id = randomUUID();
    this.name = ingredient.name;
  }

  static build(ingredient: CreateIngredientDto) {
    return new Ingredient(ingredient);
  }
}
