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
import { XsrfModule } from 'src/xsrf/xsrf.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
      inject: [ConfigService],
      global: true,
    }),
    UserModule,
    CommonModule,
    XsrfModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConnectionService,
    SetAuthCookiesInterceptor,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
