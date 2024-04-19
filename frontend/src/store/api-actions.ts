import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, LoggedUser, State } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, UserRole } from '../const';
import { RegisterData } from '../types/user-form-data';
import { saveTokens } from '../services/token';
import { redirectToRoute } from './actions';

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

export const loginAction = createAsyncThunk<
  LoggedUser,
  undefined,
  asyncThunkConfig
>('user/login', async (_arg, { getState, dispatch, extra: api }) => {
  const { email, password } = getState().USER_FORM;
  const { data } = await api.post<LoggedUser>(APIRoute.Login, {
    email,
    password,
  });
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  dispatch(
    redirectToRoute(
      data.role === UserRole.Default ? AppRoute.Main : AppRoute.Account
    )
  );
  return data;
});

export const registerAction = createAsyncThunk<
  LoggedUser,
  RegisterData,
  asyncThunkConfig
>('user/register', async (registerData, { extra: api }) => {
  const { data } = await api.post<LoggedUser>(APIRoute.Register, registerData);
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  return data;
});
