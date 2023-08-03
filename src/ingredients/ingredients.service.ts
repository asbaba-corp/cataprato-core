import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async create(payload: CreateIngredientDto) {
    const ingredient = Ingredient.build(payload);
    const response = await this.ingredientsRepository.create(ingredient);

    return response;
  }

  async findAll() {
    const response = await this.ingredientsRepository.findAll();
    return response;
  }
}
