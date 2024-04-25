import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types';
import { MetroStation, NameSpace, UserLevel, UserSex } from '../../const';
import { getAuthUserAction, updateUserAction } from '../api-actions';

const initialState: UserData = {
  name: '',
  location: MetroStation.Petrogadskaya,
  avatar: undefined,
  sex: UserSex.Other,
  level: UserLevel.Amateur,
  description: '',
  isReady: false,
  workoutTypes: [],
  caloriesToLose: 0,
  caloriesPerDay: 0,
  certificates: [],
  isDataReady: false,
};

export const userData = createSlice({
  name: NameSpace.UserData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthUserAction.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.location = action.payload.location;
        state.avatar = action.payload.avatar;
        state.level = action.payload.level;
        state.sex = action.payload.sex;
        state.isReady = action.payload.isReady;
        state.description = action.payload.description;
        state.workoutTypes = action.payload.workoutTypes;
        if (action.payload.caloriesToLose) {
          state.caloriesToLose = action.payload.caloriesToLose;
        }
        if (action.payload.caloriesPerDay) {
          state.caloriesPerDay = action.payload.caloriesPerDay;
        }
        if (action.payload.certificates) {
          state.certificates = action.payload.certificates;
        }
        state.isDataReady = true;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.location = action.payload.location;
        state.level = action.payload.level;
        state.sex = action.payload.sex;
        state.isReady = action.payload.isReady;
        state.description = action.payload.description;
        state.workoutTypes = action.payload.workoutTypes;
        state.avatar = action.payload.avatar;
      });
  },
});
