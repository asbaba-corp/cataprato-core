import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    examples: ['American Pie', 'Detroit Style Pizza', 'Fish and tip´s'],
    description: 'The name of the Recipe',
    type: String,
  })
  name: string;

  @ApiProperty({
    examples: [['random-uuid', 'random-uuid']],
    description: 'The IDs of Ingredients',
    type: String,
  })
  ingredients: string[];

  @ApiProperty({
    example: ['random-uuid'],
    description: 'the ID of the creator of that recipe',
    type: String,
  })
  creator: string;
}
