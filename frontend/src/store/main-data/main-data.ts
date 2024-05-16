import { createSlice } from '@reduxjs/toolkit';
import { MainData } from '../../types';
import { NameSpace } from '../../const';
import { getMainPageDataAction } from '../api-actions';

const initialState: MainData = {
  workoutsForUser: [],
  specialWorkouts: [],
  popularWorkouts: [],
  readyUsers: [],
  isDataLoading: false,
};

export const mainData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMainPageDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getMainPageDataAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getMainPageDataAction.fulfilled, (state, action) => {
        state.workoutsForUser = action.payload.workoutsForUser;
        state.specialWorkouts = action.payload.specialWorkouts;
        state.popularWorkouts = action.payload.popularWorkouts;
        state.readyUsers = action.payload.readyUsers;
        state.isDataLoading = false;
      });
  },
});
