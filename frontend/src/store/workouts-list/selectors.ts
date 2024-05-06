import { NameSpace, WorkoutsSortType } from '../../const';
import { State, Workout } from '../../types';

export const getWorkoutsList = (state: State): Workout[] =>
  state[NameSpace.WorkoutsList].workouts;

export const getWorkoutsMinPrice = (state: State): number =>
  state[NameSpace.WorkoutsList].price.min;

export const getWorkoutsMaxPrice = (state: State): number =>
  state[NameSpace.WorkoutsList].price.max;

export const getWorkoutsFilterMinPrice = (state: State): number | undefined =>
  state[NameSpace.WorkoutsList].filter.price.min;

export const getWorkoutsFilterMaxPrice = (state: State): number | undefined =>
  state[NameSpace.WorkoutsList].filter.price.max;

export const getWorkoutsMinCalories = (state: State): number =>
  state[NameSpace.WorkoutsList].calories.min;

export const getWorkoutsMaxCalories = (state: State): number =>
  state[NameSpace.WorkoutsList].calories.max;

export const getWorkoutsFilterMinCalories = (
  state: State,
): number | undefined => state[NameSpace.WorkoutsList].filter.calories.min;

export const getWorkoutsFilterMaxCalories = (
  state: State,
): number | undefined => state[NameSpace.WorkoutsList].filter.calories.max;

export const getWorkoutsMinRating = (state: State): number =>
  state[NameSpace.WorkoutsList].rating.min;

export const getWorkoutsMaxRating = (state: State): number =>
  state[NameSpace.WorkoutsList].rating.max;

export const getWorkoutsFilterMinRating = (state: State): number =>
  state[NameSpace.WorkoutsList].filter.rating.min;

export const getWorkoutsFilterMaxRating = (state: State): number =>
  state[NameSpace.WorkoutsList].filter.rating.max;

export const getWorkoutsFilterDuration = (state: State): string[] =>
  state[NameSpace.WorkoutsList].filter.duration;

export const getWorkoutsFilterTypes = (state: State): string[] =>
  state[NameSpace.WorkoutsList].filter.types;

export const getWorkoutsSortingType = (state: State): WorkoutsSortType | undefined =>
  state[NameSpace.WorkoutsList].filter.sorting;

export const isWorkoutsListLoading = (state: State): boolean =>
  state[NameSpace.WorkoutsList].isDataLoading;
