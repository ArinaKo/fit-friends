import { WorkoutsSortType } from '../../const';
import { State } from '../../types';

export function getAllWorkoutsQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const { price, calories, rating, types, sorting } =
    state.WORKOUTS_LIST.filter;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', currentPage.toString());
  if (price.min) {
    params.append('minPrice', price.min.toString());
  }
  if (price.max) {
    params.append('maxPrice', price.max.toString());
  }
  if (calories.min) {
    params.append('minCalories', calories.min.toString());
  }
  if (calories.max) {
    params.append('maxCalories', calories.max.toString());
  }
  if (rating.min) {
    params.append('minRating', rating.min.toString());
  }
  if (rating.max) {
    params.append('maxRating', rating.max.toString());
  }
  if (types.length) {
    types.forEach((item) => {
      params.append('workoutTypes', item);
    });
  }
  if (
    sorting === WorkoutsSortType.PriceDown ||
    sorting === WorkoutsSortType.PriceUp
  ) {
    params.append('sorting', sorting);
  }
  return params;
}
