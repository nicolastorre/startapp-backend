import {
  Action,
  Permission,
  Role,
} from 'src/authorization/entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/createPermission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = new Permission();
    permission.action = createPermissionDto.action;
    permission.conditions = createPermissionDto.conditions;
    if (createPermissionDto.user) {
      permission.user = createPermissionDto.user;
    }
    permission.role = createPermissionDto.role;
    if (createPermissionDto.resource) {
      permission.resource = createPermissionDto.resource;
    }

    return this.permissionRepository.save(permission);
  }

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  findOneBy(key: string, value: any) {
    return this.permissionRepository.findOneBy({ [key]: value });
  }

  remove(uuid: string) {
    return this.permissionRepository.delete({ uuid });
  }

  findUserPermissions(userUuid: string, resourceUuid: string, action: Action) {
    return this.permissionRepository.find({
      where: {
        user: { uuid: userUuid },
        resource: { uuid: resourceUuid },
        action,
      },
    });
  }

  findRolePermissions(role: Role, resourceUuid: string, action: Action) {
    return this.permissionRepository
      .createQueryBuilder('permission')
      .where('permission.role = :role', { role })
      .andWhere('permission.resource.uuid = :resourceUuid', {
        resourceUuid,
      })
      .andWhere('permission.action = :action', { action })
      .getMany();
  }
}
