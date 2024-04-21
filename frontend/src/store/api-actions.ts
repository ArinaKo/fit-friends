import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, LoggedUser, State } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, UserRole } from '../const';
import { saveTokens } from '../services/token';
import { redirectToRoute } from './actions';
import { getRegisterFormData } from '../utils/get-form-data';

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
  Blob,
  asyncThunkConfig
>('user/register', async (avatar, { getState, extra: api }) => {
  const formData = getRegisterFormData(getState(), avatar);
  const { data } = await api.post<LoggedUser>(APIRoute.Register, formData);
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  return data;
});
