import { User } from './user';

export type Comment = {
  id: string;
  rating: number;
  text: string;
  user: User;
};
