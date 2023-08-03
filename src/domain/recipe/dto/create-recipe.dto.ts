import { Ingredient } from '../../ingredients/entities/ingredient.entity';

export class CreateRecipeDto {
  name: string;
  ingredients: Ingredient[];
  creator: string;
}
