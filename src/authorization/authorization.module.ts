import { Module } from '@nestjs/common';
import { Resource } from './entities/resource.entity';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Resource, Permission])] })
export class AuthorizationModule {}
