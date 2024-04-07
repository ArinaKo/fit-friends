import { User, TokenPayload } from '@app/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id!,
    email: user.email,
    role: user.role,
    name: user.name,
    isReady: user.isReady,
  };
}
