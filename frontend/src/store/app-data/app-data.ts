import { createSlice } from '@reduxjs/toolkit';
import { AppData, AuthorizationStatus } from '../../types';
import { NameSpace } from '../../const';

const initialState: AppData = {
  authStatus: AuthorizationStatus.Unknown,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {},
});
