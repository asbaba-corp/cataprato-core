import { Module } from '@nestjs/common';
import { IngredientModule } from './domain/ingredients/ingredients.module';
import { AppController } from './app.controller';
import { DynamoModule } from './database/dynamodb/dynamo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DynamoModule,
    IngredientModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
