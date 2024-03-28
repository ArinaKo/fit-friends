import { User } from './user.interface';

export interface Friends {
  id?: string;
  userId: string;
  friendsList: User[];
}
