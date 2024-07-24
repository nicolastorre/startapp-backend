import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/createResource.dto';
import { PermissionService } from './permission.service';
import { Action, Role } from './entities/permission.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private permissionRepository: PermissionService,
  ) {}

  async createResourceWithDefaultPermissions(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    for (const action of Object.values(Action) as Action[]) {
      createResourceDto.permissions?.push({
        role: Role.ADMIN,
        action,
      });
    }
    return this.resourceRepository.save(createResourceDto);
  }

  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return this.resourceRepository.save(createResourceDto);
  }
}
