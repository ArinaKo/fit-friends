import { State } from '../types';

export function getCoachWorkoutsQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const { price, calories, rating, duration } = state.WORKOUTS_LIST.filter;
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
  if (duration.length) {
    duration.forEach((item) => {
      params.append('workoutDurations', item);
    });
  }
  return params;
}

export function getCoachOrdersQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const { type, directionDown } = state.ORDERS_LIST.sorting;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', currentPage.toString());
  params.append('sortingType', type);
  params.append('sortDirection', directionDown ? '-1' : '1');
  return params;
}
