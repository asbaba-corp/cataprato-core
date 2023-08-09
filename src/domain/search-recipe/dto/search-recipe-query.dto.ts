import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export type SearchRecipesFilters = {
  includes: boolean;
  containing: number;
  maxResults: number;
  sortBy: 'ingredientCount' | 'name';
};

export class SearchRecipeQueryDTO {
  @Transform(({ value }) => {
    return value.split(',');
  })
  public ingredients: string[];

  @IsOptional()
  public filters: SearchRecipesFilters;
}
