import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { Actions, Role } from './entities/permission.entity';
import { CreateResourceDto } from './dto/createResource.dto';
import { PermissionService } from './permission.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private permissionRepository: PermissionService,
  ) {}

  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    const resource = this.resourceRepository.create(createResourceDto);
    await this.resourceRepository.save(resource);

    const role = Role.ADMIN;
    const permissions = [
      { action: Actions.READ },
      { action: Actions.WRITE },
      { action: Actions.EDIT },
      { action: Actions.DELETE },
      { action: Actions.PUBLISH },
    ];

    for (const perm of permissions) {
      this.permissionRepository.create({
        ...perm,
        role,
        resource,
      });
    }

    return resource;
  }
}
