import { Workout } from './workout';

export type OrdersInfo = {
  count: number;
  sum: number;
};

export type WorkoutOrders = OrdersInfo & {
  workout: Workout;
};
