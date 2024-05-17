import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkoutInfo } from '../../types';
import { NameSpace } from '../../const';
import {
  decreaseWorkoutBalanceAction,
  getWorkoutAction,
  sendCommentAction,
  updateWorkoutAction,
  updateWorkoutVideoAction,
} from '../api-actions';

const initialState: WorkoutInfo = {
  id: '',
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
  comments: [],
  isDataLoading: false,
  isDataEditing: false,
};

export const workoutInfo = createSlice({
  name: NameSpace.WorkoutInfo,
  initialState,
  reducers: {
    setWorkoutEditingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataEditing = action.payload;
    },
  },
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
        state.price = String(action.payload.price);
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
        state.comments = action.payload.comments;
        state.isDataLoading = false;
      })
      .addCase(decreaseWorkoutBalanceAction.fulfilled, (state, action) => {
        state.balance = action.payload.count;
      })
      .addCase(updateWorkoutAction.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.price = String(action.payload.price);
        state.isDataEditing = false;
      })
      .addCase(updateWorkoutVideoAction.fulfilled, (state, action) => {
        state.video = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = [action.payload.comment, ...state.comments];
        state.rating = action.payload.rating;
      });
  },
});

export const { setWorkoutEditingStatus } = workoutInfo.actions;
