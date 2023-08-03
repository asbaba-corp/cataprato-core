import { Global, Module } from '@nestjs/common';
import { DynamoService } from './dynamo.service';
import { AppConfigService } from '../../config/config.service';

@Global()
@Module({
  providers: [DynamoService, AppConfigService],
  exports: [DynamoService],
})
export class DynamoModule {}
