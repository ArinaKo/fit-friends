import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, LoggedUser, State} from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, UserRole  } from '../const';
import { LoginData, RegisterData } from '../types/user-form-data';
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
  LoginData,
  asyncThunkConfig
>('user/login', async (authData, { dispatch, extra: api }) => {
  const { data } = await api.post<LoggedUser>(APIRoute.Login, authData);
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  data.role === UserRole.Default
    ? dispatch(redirectToRoute(AppRoute.Main))
    : dispatch(redirectToRoute(AppRoute.Account));
  return data;
});

export const registerAction = createAsyncThunk<
  LoggedUser,
  RegisterData,
  asyncThunkConfig
>('user/register', async (registerData, { dispatch, extra: api }) => {
  const { data } = await api.post<LoggedUser>(APIRoute.Register, registerData);
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  dispatch(redirectToRoute(AppRoute.Questionary));
  return data;
});
