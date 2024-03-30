import { Workout } from './workout.interface';

export interface Balance {
  userId?: string;
  count: number;
  workout: Workout;
}
