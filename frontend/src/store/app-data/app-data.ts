import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppData, Route } from '../../types';
import { NameSpace } from '../../const';
import {
  checkAuthAction,
  decreaseWorkoutBalanceAction,
  loginAction,
  registerAction,
  deleteNotificationAction,
  getUserNotificationsAction,
} from '../api-actions';
import { AuthorizationStatus } from '../../const';

const initialState: AppData = {
  authStatus: AuthorizationStatus.Unknown,
  userRole: undefined,
  userId: '',
  notifications: [],
  activeWorkout: undefined,
  activePage: undefined,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {
    setActiveWorkout: (state, action: PayloadAction<string | undefined>) => {
      state.activeWorkout = action.payload;
    },
    setActiveRoute: (state, action: PayloadAction<Route | undefined>) => {
      state.activePage = action.payload;
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
      })
      .addCase(getUserNotificationsAction.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(deleteNotificationAction.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== deletedId,
        );
      });
  },
});

export const { setActiveWorkout, setActiveRoute } = appData.actions;
