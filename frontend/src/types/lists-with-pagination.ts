import { Workout } from './workout';

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
