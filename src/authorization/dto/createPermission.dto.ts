import { IsString } from 'class-validator';
import { Actions, Role } from '../entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import { Resource } from '../entities/resource.entity';

export class CreatePermissionDto {
  @IsString()
  action: Actions;

  @IsString()
  conditions?: string;

  user?: User;

  role: Role;

  resource?: Resource;
}
