import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types';
import { NameSpace } from '../../const';
import {
  checkAuthAction,
  decreaseWorkoutBalanceAction,
  loginAction,
  registerAction,
} from '../api-actions';
import { AuthorizationStatus } from '../../const';

const initialState: AppData = {
  authStatus: AuthorizationStatus.Unknown,
  userRole: undefined,
  userId: '',
  activeWorkout: undefined,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {
    setActiveWorkout: (state, action: PayloadAction<string | undefined>) => {
      state.activeWorkout = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
        state.userId = action.payload.id;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
        state.userId = action.payload.id;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
        state.userId = action.payload.id;
      })
      .addCase(decreaseWorkoutBalanceAction.fulfilled, (state, action) => {
        state.activeWorkout = action.payload.workoutId;
      });
  },
});

export const { setActiveWorkout } = appData.actions;
