import { User, TokenPayload } from '@app/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    id: user.id!,
    email: user.email,
    role: user.role,
    name: user.name,
    avatar: user.avatar,
    isReady: user.isReady,
  };
}
