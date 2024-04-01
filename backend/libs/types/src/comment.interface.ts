import { User } from "./user.interface";

export interface Comment {
  id?: string;
  userId: string;
  workoutId: string;
  rating: number;
  text: string;
  user?: User;
}
