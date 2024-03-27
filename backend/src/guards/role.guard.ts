import { UserRole } from '@app/types';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<UserRole>('role', context.getHandler());
    if (!role) {
      throw new ForbiddenException();
    }
    const userRole = context.switchToHttp().getRequest().tokenPayload.role;
    return userRole === role;
  }
}
