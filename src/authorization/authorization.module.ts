import { Module } from '@nestjs/common';
import { Resource } from './entities/resource.entity';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Permission])],
  providers: [PermissionService, ResourceService],
  exports: [ResourceService, PermissionService],
})
export class AuthorizationModule {}
