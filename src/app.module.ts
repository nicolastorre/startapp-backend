import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ArticlesModule } from './articles/articles.module';
import { AppDataSource } from './config/data-source';
import { XsrfModule } from './xsrf/xsrf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({
        ...AppDataSource.options,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    CommonModule,
    AuthModule,
    AuthorizationModule,
    ArticlesModule,
    XsrfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
