import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get awsDynamoConfig(): DynamoDBClientConfig {
    return {
      region: this.configService.get<string>('DYNAMO_REGION'),
      credentials: {
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      },
    };
  }
}
