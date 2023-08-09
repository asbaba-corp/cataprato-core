import { Test, TestingModule } from '@nestjs/testing';
import { SearchRecipeController } from './search-recipe.controller';
import { SearchRecipeService } from './search-recipe.service';

describe('SearchRecipeController', () => {
  let controller: SearchRecipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchRecipeController],
      providers: [SearchRecipeService],
    }).compile();

    controller = module.get<SearchRecipeController>(SearchRecipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
