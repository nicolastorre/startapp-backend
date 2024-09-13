import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winstonConfiguration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: false, transform: true }));
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get<string>('frontendUrl'),
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
