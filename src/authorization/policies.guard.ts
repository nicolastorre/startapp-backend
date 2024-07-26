import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { actionType } from './decorators/permission.decorator';
import { PermissionService } from './permission.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resource = request.resource;
    const action: any = this.reflector.getAllAndOverride<string>(actionType, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Vérifier les permissions basées sur les utilisateurs
    const userPermissions = await this.permissionService.findUserPermissions(
      user.uuid,
      resource.uuid,
      action,
    );

    // Vérifier les permissions basées sur les rôles
    const rolePermissions = await this.permissionService.findRolePermissions(
      user.role,
      resource.uuid,
      action,
    );

    const permissions = [...userPermissions, ...rolePermissions];

    console.log(user.role, resource.uuid, action, permissions);

    return permissions.some((permission) =>
      this.evaluateConditions(permission.conditions, user, resource),
    );
  }

  private evaluateConditions(
    conditions: string | undefined,
    user: any,
    resource: any,
  ): boolean {
    if (!conditions) {
      return true;
    }

    const parsedConditions = JSON.parse(conditions);
    return parsedConditions.every(
      (condition: {
        userAttribute: string;
        resourceAttribute: string;
        operator: string;
      }) => {
        const { userAttribute, resourceAttribute, operator } = condition;
        const userValue = user[userAttribute];
        const resourceValue = resource[resourceAttribute];

        switch (operator) {
          case '==':
            return userValue == resourceValue;
          case '!=':
            return userValue != resourceValue;
          case '<':
            return userValue < resourceValue;
          case '>':
            return userValue > resourceValue;
          case '<=':
            return userValue <= resourceValue;
          case '>=':
            return userValue >= resourceValue;
          default:
            return false;
        }
      },
    );
  }
}
