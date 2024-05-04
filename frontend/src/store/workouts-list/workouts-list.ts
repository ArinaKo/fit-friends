import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkoutsList } from '../../types';
import {
  CaloriesValue,
  ListItemsPortion,
  NameSpace,
  PriceValue,
  RatingValue,
} from '../../const';
import { getCoachWorkoutsAction } from '../api-actions';

const initialState: WorkoutsList = {
  workouts: [],
  limit: ListItemsPortion.Default,
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  itemsPerPage: 0,
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
    setWorkoutsLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    increaseWorkoutsLimit: (state, action: PayloadAction<number>) => {
      state.limit = state.limit + action.payload;
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
      .addCase(getCoachWorkoutsAction.fulfilled, (state, action) => {
        const {
          workouts,
          currentPage,
          itemsPerPage,
          totalItems,
          totalPages,
          priceRange,
          caloriesRange,
        } = action.payload;
        state.workouts = workouts;
        state.currentPage = currentPage;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
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
  setWorkoutsLimit,
  increaseWorkoutsLimit,
  setWorkoutsPriceFilter,
  setWorkoutsCaloriesFilter,
  setWorkoutsRatingFilter,
  setWorkoutsDurationFilter,
} = workoutsList.actions;
