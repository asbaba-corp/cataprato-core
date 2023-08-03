import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async create(payload: CreateIngredientDto) {
    const newIngredient = Ingredient.build(payload);
    const ingredient = await this.ingredientsRepository.create(newIngredient);

    return ingredient;
  }

  async findAll() {
    const ingredients = await this.ingredientsRepository.findAll();
    return ingredients;
  }

  async findOne(id: string) {
    const ingredient = await this.ingredientsRepository.findOne(id);
    return ingredient;
  }
}
