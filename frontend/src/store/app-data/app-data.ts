import { createSlice } from '@reduxjs/toolkit';
import { AppData, AuthorizationStatus } from '../../types';
import { NameSpace } from '../../const';
import { checkAuthAction, loginAction } from '../api-actions';
import { UserRole } from '../../types/user-role.enum';

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
        state.userRole = action.payload.role as UserRole;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.role;
      });
  },
});
