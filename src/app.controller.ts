import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    // get an environment variable
    const dbUser = this.configService.get<string>('DATABASE_USER');

    // get a custom configuration value
    const dbHost = this.configService.get<string>('database.host');

    console.log(dbUser, dbHost);

    return this.appService.getHello();
  }
}
