import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Reflector } from '@nestjs/core';
import { actionType } from './decorators/permission.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private reflector: Reflector,
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
    const userPermissions = await this.permissionRepository.find({
      where: { user, resource, action },
    });

    // Vérifier les permissions basées sur les rôles
    const rolePermissions = await this.permissionRepository
      .createQueryBuilder('permission')
      .leftJoinAndSelect('permission.role', 'role')
      .leftJoin('role.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere('permission.resourceId = :resourceId', {
        resourceId: resource.id,
      })
      .andWhere('permission.action = :action', { action })
      .getMany();

    const permissions = [...userPermissions, ...rolePermissions];

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
