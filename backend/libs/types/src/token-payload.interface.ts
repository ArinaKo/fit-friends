import { UserRole } from './user-role.enum';

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar: string;
  isReady: boolean;
}
