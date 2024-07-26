import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/createResource.dto';
import { Action, Role } from './entities/permission.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  createResourceWithPermissions(
    type: string,
    actions: Action[],
    role: Role,
    user?: User,
  ): CreateResourceDto {
    const createResourceDto = new CreateResourceDto();
    createResourceDto.type = type;
    createResourceDto.permissions = [];
    for (const action of actions) {
      createResourceDto.permissions?.push({
        action,
        role,
        user,
      });
    }
    return createResourceDto;
  }

  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return this.resourceRepository.save(createResourceDto);
  }

  async findOne(uuid: string): Promise<Resource | null> {
    return this.resourceRepository.findOneBy({ uuid });
  }
}
