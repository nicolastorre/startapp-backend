import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/IsPublic';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: Logger,
  ) {}

  @Get('getHealthCheck')
  @Public()
  getHealthcheck(): string {
    Logger.debug('test log getHealthcheck debug');

    return this.appService.getHealthCheck();
  }
}
