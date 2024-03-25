import { UserRole } from '@app/types';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ownerId = request.params.userId;
    const userId = request.tokenPayload.sub;

    if (userId !== ownerId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
