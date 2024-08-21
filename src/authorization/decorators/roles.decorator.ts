import { SetMetadata } from '@nestjs/common';
import { Role } from '../Role.enum';

export const rolesType = 'ROLES_TYPE';
export const Roles = (...roles: Role[]) => SetMetadata(rolesType, roles);
