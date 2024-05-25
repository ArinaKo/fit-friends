import { NameSpace, WorkoutDuration, WorkoutType } from '../../const';
import { WorkoutsList } from '../../types';
import { makeFakeWorkout } from '../../utils';
import {
  getWorkoutsFilterDuration,
  getWorkoutsFilterMaxCalories,
  getWorkoutsFilterMaxPrice,
  getWorkoutsFilterMaxRating,
  getWorkoutsFilterMinCalories,
  getWorkoutsFilterMinPrice,
  getWorkoutsFilterMinRating,
  getWorkoutsFilterTypes,
  getWorkoutsList,
  getWorkoutsMaxCalories,
  getWorkoutsMaxPrice,
  getWorkoutsMaxRating,
  getWorkoutsMinCalories,
  getWorkoutsMinPrice,
  getWorkoutsMinRating,
  getWorkoutsSortingType,
  isWorkoutsListLoading,
} from './selectors';

describe('WorkoutsList selectors', () => {
  const state: WorkoutsList = {
    workouts: [makeFakeWorkout()],
    price: {
      min: 300,
      max: 1200,
    },
    calories: {
      min: 1000,
      max: 5000,
    },
    rating: {
      min: 3,
      max: 5,
    },
    filter: {
      price: {
        min: undefined,
        max: undefined,
      },
      calories: {
        min: undefined,
        max: undefined,
      },
      rating: {
        min: 0,
        max: 5,
      },
      duration: [WorkoutDuration.Medium],
      types: [WorkoutType.Box],
      sorting: undefined,
    },
    isDataLoading: false,
  };

  it('should return workouts list', () => {
    const { workouts } = state;

    const result = getWorkoutsList({ [NameSpace.WorkoutsList]: state });

    expect(result).toEqual(workouts);
  });

  it('should return workouts min price value', () => {
    const { min } = state.price;

    const result = getWorkoutsMinPrice({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(min);
  });

  it('should return workouts max price value', () => {
    const { max } = state.price;

    const result = getWorkoutsMaxPrice({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(max);
  });

  it('should return workouts filter min price value', () => {
    const { min } = state.filter.price;

    const result = getWorkoutsFilterMinPrice({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toBe(min);
  });

  it('should return workouts filter max price value', () => {
    const { max } = state.filter.price;

    const result = getWorkoutsFilterMaxPrice({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toBe(max);
  });

  it('should return workouts min calories value', () => {
    const { min } = state.calories;

    const result = getWorkoutsMinCalories({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(min);
  });

  it('should return workouts max calories value', () => {
    const { max } = state.calories;

    const result = getWorkoutsMaxCalories({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(max);
  });

  it('should return workouts filter min calories value', () => {
    const { min } = state.filter.calories;

    const result = getWorkoutsFilterMinCalories({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toBe(min);
  });

  it('should return workouts filter max calories value', () => {
    const { max } = state.filter.calories;

    const result = getWorkoutsFilterMaxCalories({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toBe(max);
  });

  it('should return workouts min rating value', () => {
    const { min } = state.rating;

    const result = getWorkoutsMinRating({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(min);
  });

  it('should return workouts max rating value', () => {
    const { max } = state.rating;

    const result = getWorkoutsMaxRating({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(max);
  });

  it('should return workouts filter min rating value', () => {
    const { min } = state.filter.rating;

    const result = getWorkoutsFilterMinRating({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toBe(min);
  });

  it('should return workouts filter max rating value', () => {
    const { max } = state.filter.rating;

    const result = getWorkoutsFilterMaxRating({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toBe(max);
  });

  it('should return workouts filter duration value', () => {
    const { duration } = state.filter;

    const result = getWorkoutsFilterDuration({
      [NameSpace.WorkoutsList]: state,
    });

    expect(result).toEqual(duration);
  });

  it('should return workouts filter types value', () => {
    const { types } = state.filter;

    const result = getWorkoutsFilterTypes({ [NameSpace.WorkoutsList]: state });

    expect(result).toEqual(types);
  });

  it('should return workouts sorting type value', () => {
    const { sorting } = state.filter;

    const result = getWorkoutsSortingType({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(sorting);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isWorkoutsListLoading({ [NameSpace.WorkoutsList]: state });

    expect(result).toBe(isDataLoading);
  });
});
