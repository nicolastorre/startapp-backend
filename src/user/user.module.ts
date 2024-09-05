import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { XsrfModule } from 'src/xsrf/xsrf.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthorizationModule, XsrfModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
