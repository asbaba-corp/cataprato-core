import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get awsDynamoConfig() {
    return {
      region: this.configService.get<string>('DYNAMO_REGION'),
      credentials: {
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        sessionToken: this.configService.get<string>('AWS_SESSION_TOKEN'),
      },
    };
  }
}
