import { IsString } from 'class-validator';
import { CreatePermissionDto } from './createPermission.dto';

export class CreateResourceDto {
  @IsString()
  type: string;

  permissions?: CreatePermissionDto[];
}
