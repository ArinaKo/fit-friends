import { createSlice } from '@reduxjs/toolkit';
import { WorkoutInfo } from '../../types';
import { NameSpace } from '../../const';
import {
  decreaseWorkoutBalanceAction,
  getWorkoutAction,
} from '../api-actions';

const initialState: WorkoutInfo = {
  id: undefined,
  coachId: '',
  title: '',
  price: '',
  description: '',
  isSpecial: false,
  video: undefined,
  backgroundImage: '',
  rating: 0,
  type: '',
  calories: 0,
  userSex: '',
  duration: '',
  coach: undefined,
  balance: null,
  isDataLoading: false,
};

export const workoutInfo = createSlice({
  name: NameSpace.WorkoutInfo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWorkoutAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getWorkoutAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getWorkoutAction.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.coachId = action.payload.coachId;
        state.title = action.payload.title;
        state.price = action.payload.price.toString();
        state.description = action.payload.description;
        state.isSpecial = action.payload.isSpecial;
        state.video = action.payload.video;
        state.backgroundImage = action.payload.backgroundImage;
        state.rating = action.payload.rating;
        state.type = action.payload.type;
        state.calories = action.payload.calories;
        state.userSex = action.payload.userSex;
        state.duration = action.payload.duration;
        state.coach = action.payload.coach;
        state.balance = action.payload.balance;
        state.isDataLoading = false;
      })
      .addCase(decreaseWorkoutBalanceAction.fulfilled, (state, action) => {
        state.balance = action.payload.count;
      });
  },
});
