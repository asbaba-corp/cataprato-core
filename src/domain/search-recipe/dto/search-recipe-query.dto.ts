import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchRecipesFilters {
  includes: boolean;
  containing: number;
  maxResults: number;
  sortBy: 'ingredientCount' | 'name';
}

export class SearchRecipeQueryDTO {
  @ApiProperty({
    description: 'the IDs of the ingredients to search',
    type: String,
  })
  @Transform(({ value }) => {
    return value.split(',');
  })
  public ingredients: string[];

  @ApiProperty({
    description: 'Filters to apply in the search',
    type: SearchRecipesFilters,
    required: false,
  })
  @IsOptional()
  public filters: SearchRecipesFilters;
}
