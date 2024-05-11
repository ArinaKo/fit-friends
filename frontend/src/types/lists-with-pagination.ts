import { Comment } from './comment';
import { Friend } from './friend';
import { Workout } from './workout';
import { WorkoutBalance } from './workout-balance';
import { WorkoutOrders } from './workout-orders';

export type FieldRange = [min: number, max: number];

type BasePagination = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

export type WorkoutsWithPagination = BasePagination & {
  workouts: Workout[];
  priceRange: FieldRange;
  caloriesRange: FieldRange;
};

export type OrdersWithPagination = BasePagination & {
  orders: WorkoutOrders[];
};

export type BalancesWithPagination = BasePagination & {
  balances: WorkoutBalance[];
};

export type FriendsWithPagination = BasePagination & {
  friends: User[];
};

export type CommentsWithPagination = BasePagination & {
  comments: Comment[];
};
