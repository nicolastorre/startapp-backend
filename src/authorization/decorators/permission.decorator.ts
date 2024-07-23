import { SetMetadata } from '@nestjs/common';

export const actionType = 'ACTION_TYPE';
export const PermissionAction = (action: string) =>
  SetMetadata(actionType, action);
