import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/createResource.dto';
import { User } from 'src/user/entities/user.entity';
import { Action } from './Action.enum';
import { Role } from './Role.enum';

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
    createResourceDto.permissions = [];
    for (const action of actions) {
      createResourceDto.permissions?.push({
        action,
        role,
        user,
        type,
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
