import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { AppConfigService } from '../../config/config.service';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoService {
  public client: DynamoDBDocumentClient;

  constructor(private configService: AppConfigService) {
    const dynamoConfig = this.configService.awsDynamoConfig;

    this.client = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: dynamoConfig.region,
        credentials: {
          accessKeyId: dynamoConfig.credentials.accessKeyId,
          secretAccessKey: dynamoConfig.credentials.secretAccessKey,
          sessionToken: dynamoConfig.credentials.sessionToken,
        },
      }),
    );
  }
}
