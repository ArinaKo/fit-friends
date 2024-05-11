import { Workout } from './workout';

export type WorkoutBalance = {
  workout: Workout;
  count: number;
};

export type WorkoutBalanceStatus = {
  count: number | null;
};
