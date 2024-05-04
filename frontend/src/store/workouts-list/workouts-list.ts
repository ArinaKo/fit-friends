import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkoutsList } from '../../types';
import {
  CaloriesValue,
  NameSpace,
  PriceValue,
  RatingValue,
} from '../../const';
import { getCoachWorkoutsAction } from '../api-actions';

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
  },
  isDataLoading: false,
};

export const workoutsList = createSlice({
  name: NameSpace.UserData,
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
        const {
          workouts,
          currentPage,
          priceRange,
          caloriesRange,
        } = action.payload;
        state.workouts = currentPage === 1 ? workouts : [...state.workouts, ...workouts];
        state.price.min = priceRange[0];
        state.price.max = priceRange[1];
        state.calories.min = caloriesRange[0];
        state.calories.max = caloriesRange[1];
        state.isDataLoading = true;
      });
  },
});

export const {
  resetWorkoutsFilters,
  setWorkoutsPriceFilter,
  setWorkoutsCaloriesFilter,
  setWorkoutsRatingFilter,
  setWorkoutsDurationFilter,
} = workoutsList.actions;
