import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types';
import { NameSpace } from '../../const';
import { checkAuthAction, loginAction, registerAction } from '../api-actions';
import { AuthorizationStatus } from '../../const';

const initialState: AppData = {
  authStatus: AuthorizationStatus.Unknown,
  userRole: undefined,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
      });
  },
});
