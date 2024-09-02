import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from './entities/connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionService } from './connection.service';
import { CommonModule } from 'src/common/common.module';
import { SetAuthCookiesInterceptor } from './SetAuthCookiesInterceptor';
import { XsrfGuard } from './xsrf.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
      global: true,
    }),
    UserModule,
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConnectionService,
    SetAuthCookiesInterceptor,
    XsrfGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, XsrfGuard],
})
export class AuthModule {}
