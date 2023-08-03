import { Module } from '@nestjs/common';
import { IngredientModule } from './domain/ingredients/ingredients.module';
import { AppController } from './app.controller';
import { DynamoModule } from './database/dynamodb/dynamo.module';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './domain/recipe/recipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DynamoModule,
    IngredientModule,
    RecipeModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
