import { SetMetadata } from '@nestjs/common';
import { Role } from '../entities/permission.entity';

export const rolesType = 'ROLES_TYPE';
export const Roles = (...roles: Role[]) => SetMetadata(rolesType, roles);
