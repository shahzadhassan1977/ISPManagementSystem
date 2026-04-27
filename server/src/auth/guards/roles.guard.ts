//src/auth/guards/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    //const user = context.switchToHttp().getRequest().user;
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const userRoles: string[] = Array.isArray(user.roles)
      ? user.roles
      : [];

    return requiredRoles.some((role) =>
      userRoles.includes(role),
    );

    //return requiredRoles.includes(user.role);
  }
}