import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../types';
import { MetroStation, NameSpace, UserLevel, UserRole } from '../../const';
import { getCoachDataAction, getUserAction } from '../api-actions';

const initialState: UserInfo = {
  id: '',
  name: '',
  location: MetroStation.Petrogadskaya,
  role: UserRole.Default,
  isReady: false,
  description: '',
  workoutTypes: [],
  level: UserLevel.Amateur,
  isFriend: false,
  images: [],
  certificates: [],
  workouts: [],
  subscriptionStatus: false,
  isDataLoading: false,
  isCoachInfoActual: true,
  isWorkoutsLoading: false,
};

export const userInfo = createSlice({
  name: NameSpace.UserInfo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getUserAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.location = action.payload.location;
        state.role = action.payload.role;
        state.isReady = action.payload.isReady;
        state.description = action.payload.description;
        state.workoutTypes = action.payload.workoutTypes;
        state.level = action.payload.level;
        state.isFriend = action.payload.isFriend;
        state.images = [action.payload.backgroundImage];
        if (action.payload.certificates) {
          state.certificates = action.payload.certificates;
        }
        if (action.payload.role === UserRole.Coach) {
          state.isCoachInfoActual = false;
        }
        state.isDataLoading = false;
      })
      .addCase(getCoachDataAction.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(getCoachDataAction.rejected, (state) => {
        state.isCoachInfoActual = true;
        state.isWorkoutsLoading = false;
      })
      .addCase(getCoachDataAction.fulfilled, (state, action) => {
        state.subscriptionStatus = action.payload.subscriptionStatus;
        state.workouts = action.payload.workouts;
        state.isCoachInfoActual = true;
        state.isWorkoutsLoading = false;
      });
  },
});
