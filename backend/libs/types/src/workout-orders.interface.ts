import { Workout } from './workout.interface';

export interface WorkoutOrders {
  totalCount: number;
  totalSum: number;
  workout: Workout;
}
