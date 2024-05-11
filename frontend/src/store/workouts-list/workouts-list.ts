import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkoutsList } from '../../types';
import {
  CaloriesValue,
  NameSpace,
  PriceValue,
  RatingValue,
  WorkoutsSortType,
} from '../../const';
import { getAllWorkoutsAction, getCoachWorkoutsAction } from '../api-actions';

const initialState: WorkoutsList = {
  workouts: [],
  price: {
    min: PriceValue.Min,
    max: PriceValue.Max,
  },
  calories: {
    min: CaloriesValue.Min,
    max: CaloriesValue.Max,
  },
  rating: {
    min: RatingValue.Default,
    max: RatingValue.Max,
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
      min: RatingValue.Default,
      max: RatingValue.Max,
    },
    duration: [],
    types: [],
    sorting: undefined,
  },
  isDataLoading: false,
};

export const workoutsList = createSlice({
  name: NameSpace.WorkoutsList,
  initialState,
  reducers: {
    resetWorkoutsFilters: (state) => {
      state.filter = initialState.filter;
    },
    setWorkoutsPriceFilter: (
      state,
      action: PayloadAction<['min' | 'max', number]>,
    ) => {
      const [key, value] = action.payload;
      state.filter.price[key] = value;
    },
    setWorkoutsCaloriesFilter: (
      state,
      action: PayloadAction<['min' | 'max', number]>,
    ) => {
      const [key, value] = action.payload;
      state.filter.calories[key] = value;
    },
    setWorkoutsRatingFilter: (
      state,
      action: PayloadAction<['min' | 'max', number]>,
    ) => {
      const [key, value] = action.payload;
      state.filter.rating[key] = value;
    },
    setWorkoutsDurationFilter: (state, action: PayloadAction<string>) => {
      const duration = action.payload;
      state.filter.duration = state.filter.duration.includes(duration)
        ? state.filter.duration.filter((item) => item !== duration)
        : [...state.filter.duration, duration];
    },
    setWorkoutsTypesFilter: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      state.filter.types = state.filter.types.includes(type)
        ? state.filter.types.filter((item) => item !== type)
        : [...state.filter.types, type];
    },
    setWorkoutsSorting: (state, action: PayloadAction<WorkoutsSortType>) => {
      const value = action.payload;
      state.filter.sorting = state.filter.sorting !== value ? value : undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCoachWorkoutsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getCoachWorkoutsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getCoachWorkoutsAction.fulfilled, (state, action) => {
        const { workouts, currentPage, priceRange, caloriesRange } =
          action.payload;
        state.workouts =
          currentPage === 1 ? workouts : [...state.workouts, ...workouts];
        state.price.min = priceRange[0];
        state.price.max = priceRange[1];
        state.calories.min = caloriesRange[0];
        state.calories.max = caloriesRange[1];
        state.isDataLoading = false;
      })
      .addCase(getAllWorkoutsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getAllWorkoutsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getAllWorkoutsAction.fulfilled, (state, action) => {
        const { workouts, currentPage, priceRange, caloriesRange } =
          action.payload;
        state.workouts =
          currentPage === 1 ? workouts : [...state.workouts, ...workouts];
        state.price.min = priceRange[0];
        state.price.max = priceRange[1];
        state.calories.min = caloriesRange[0];
        state.calories.max = caloriesRange[1];
        state.isDataLoading = false;
      });
  },
});

export const {
  resetWorkoutsFilters,
  setWorkoutsPriceFilter,
  setWorkoutsCaloriesFilter,
  setWorkoutsRatingFilter,
  setWorkoutsDurationFilter,
  setWorkoutsTypesFilter,
  setWorkoutsSorting,
} = workoutsList.actions;
