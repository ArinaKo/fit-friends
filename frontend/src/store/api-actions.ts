import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, LoggedUser, State } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';

type asyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuthAction = createAsyncThunk<
  LoggedUser,
  undefined,
  asyncThunkConfig
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<LoggedUser>(APIRoute.CheckAuth);
  return data;
});
