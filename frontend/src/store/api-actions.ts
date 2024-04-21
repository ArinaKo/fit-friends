import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, LoggedUser, State } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, UserRole } from '../const';
import { saveTokens } from '../services/token';
import { redirectToRoute } from './actions';
import {
  getCoachQuestionaryData,
  getCustomerQuestionaryData,
  getRegisterData,
} from '../utils';

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
  const formData = getRegisterData(getState(), avatar);
  const { data } = await api.post<LoggedUser>(APIRoute.Register, formData);
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  return data;
});

export const questionaryCustomerAction = createAsyncThunk<
  void,
  undefined,
  asyncThunkConfig
>('user/register', async (_arg, { getState, dispatch, extra: api }) => {
  const formData = getCustomerQuestionaryData(getState());
  await api.post(APIRoute.Register, formData);
  dispatch(redirectToRoute(AppRoute.Main));
});

export const questionaryCoachAction = createAsyncThunk<
  void,
  CoachFiles,
  asyncThunkConfig
>('user/register', async (files, { getState, dispatch, extra: api }) => {
  const formData = getCoachQuestionaryData(getState(), files.certificates);
  await api.post(APIRoute.UpdateUser, formData);
  dispatch(redirectToRoute(AppRoute.Account));
});
