import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({
    examples: ['onion', 'garlic', 'carrot'],
    description: 'The name of the Ingredient',
    type: String,
  })
  name: string;
}
