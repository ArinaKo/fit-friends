import {
  getWorkoutsFilterMaxCalories,
  getWorkoutsFilterMaxPrice,
  getWorkoutsFilterMaxRating,
  getWorkoutsFilterMinCalories,
  getWorkoutsFilterMinPrice,
  getWorkoutsFilterMinRating,
  getWorkoutsMaxCalories,
  getWorkoutsMaxPrice,
  getWorkoutsMaxRating,
  getWorkoutsMinCalories,
  getWorkoutsMinPrice,
  getWorkoutsMinRating,
  isWorkoutsListLoading,
  setWorkoutsCaloriesFilter,
  setWorkoutsPriceFilter,
  setWorkoutsRatingFilter,
} from '../../../store';
import { State } from '../../../types';

export enum RangeInputType {
  WorkoutPrice = 'workout-price',
  WorkoutCalories = 'workout-calories',
  WorkoutRating = 'workout-rating',
}

type RangeInputTypeDiff = {
  name: string;
  withFields: boolean;
  minValueSelector: (state: State) => number;
  maxValueSelector: (state: State) => number;
  minFilterSelector: (state: State) => number | undefined;
  maxFilterSelector: (state: State) => number | undefined;
  isDisabledSelector: (state: State) => boolean;
  setMinFilter: (value: number) => { payload: [string, number]; type: string };
  setMaxFilter: (value: number) => { payload: [string, number]; type: string };
};

type RangeInputTypeDiffs = {
  [type: string]: RangeInputTypeDiff;
};

export const RangeInputTypeDiffs: RangeInputTypeDiffs = {
  [RangeInputType.WorkoutPrice]: {
    name: 'price',
    withFields: true,
    minValueSelector: getWorkoutsMinPrice,
    maxValueSelector: getWorkoutsMaxPrice,
    minFilterSelector: getWorkoutsFilterMinPrice,
    maxFilterSelector: getWorkoutsFilterMaxPrice,
    isDisabledSelector: isWorkoutsListLoading,
    setMinFilter: (value: number) => setWorkoutsPriceFilter(['min', value]),
    setMaxFilter: (value: number) => setWorkoutsPriceFilter(['max', value]),
  },
  [RangeInputType.WorkoutCalories]: {
    name: 'calories',
    withFields: true,
    minValueSelector: getWorkoutsMinCalories,
    maxValueSelector: getWorkoutsMaxCalories,
    minFilterSelector: getWorkoutsFilterMinCalories,
    maxFilterSelector: getWorkoutsFilterMaxCalories,
    isDisabledSelector: isWorkoutsListLoading,
    setMinFilter: (value: number) => setWorkoutsCaloriesFilter(['min', value]),
    setMaxFilter: (value: number) => setWorkoutsCaloriesFilter(['max', value]),
  },
  [RangeInputType.WorkoutRating]: {
    name: 'rating',
    withFields: false,
    minValueSelector: getWorkoutsMinRating,
    maxValueSelector: getWorkoutsMaxRating,
    minFilterSelector: getWorkoutsFilterMinRating,
    maxFilterSelector: getWorkoutsFilterMaxRating,
    isDisabledSelector: isWorkoutsListLoading,
    setMinFilter: (value: number) => setWorkoutsRatingFilter(['min', value]),
    setMaxFilter: (value: number) => setWorkoutsRatingFilter(['max', value]),
  },
};
