import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Resource } from '../entities/resource.entity';
import { Action } from '../Action.enum';
import { Role } from '../Role.enum';

export class CreatePermissionDto {
  @IsString()
  action: Action;

  @IsString()
  conditions?: string;

  user?: User;

  role: Role;

  resource?: Resource;

  @IsString()
  type?: string;
}
