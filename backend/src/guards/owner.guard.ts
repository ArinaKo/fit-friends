import {
  ExecutionContext,
  Injectable,
  CanActivate,
} from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ownerId = request.params.userId;
    const userId = request.tokenPayload.sub;

    return userId === ownerId;
  }
}
