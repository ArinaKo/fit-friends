import { NameSpace } from '../../const';
import { State, Workout } from '../../types';

export const getWorkoutsList = (
  state: Pick<State, NameSpace.WorkoutsList>,
): Workout[] => state[NameSpace.WorkoutsList].workouts;

export const getWorkoutsMinPrice = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].price.min;

export const getWorkoutsMaxPrice = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].price.max;

export const getWorkoutsFilterMinPrice = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number | undefined => state[NameSpace.WorkoutsList].filter.price.min;

export const getWorkoutsFilterMaxPrice = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number | undefined => state[NameSpace.WorkoutsList].filter.price.max;

export const getWorkoutsMinCalories = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].calories.min;

export const getWorkoutsMaxCalories = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].calories.max;

export const getWorkoutsFilterMinCalories = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number | undefined => state[NameSpace.WorkoutsList].filter.calories.min;

export const getWorkoutsFilterMaxCalories = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number | undefined => state[NameSpace.WorkoutsList].filter.calories.max;

export const getWorkoutsMinRating = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].rating.min;

export const getWorkoutsMaxRating = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].rating.max;

export const getWorkoutsFilterMinRating = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].filter.rating.min;

export const getWorkoutsFilterMaxRating = (
  state: Pick<State, NameSpace.WorkoutsList>,
): number => state[NameSpace.WorkoutsList].filter.rating.max;

export const getWorkoutsFilterDuration = (
  state: Pick<State, NameSpace.WorkoutsList>,
): string[] => state[NameSpace.WorkoutsList].filter.duration;

export const getWorkoutsFilterTypes = (
  state: Pick<State, NameSpace.WorkoutsList>,
): string[] => state[NameSpace.WorkoutsList].filter.types;

export const getWorkoutsSortingType = (
  state: Pick<State, NameSpace.WorkoutsList>,
): string | undefined => state[NameSpace.WorkoutsList].filter.sorting;

export const isWorkoutsListLoading = (
  state: Pick<State, NameSpace.WorkoutsList>,
): boolean => state[NameSpace.WorkoutsList].isDataLoading;
