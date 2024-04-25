import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppDispatch,
  AuthUser,
  CertificatesFiles,
  LoggedUser,
  State,
  UserFiles,
} from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, UserRole } from '../const';
import { saveTokens } from '../services/token';
import { redirectToRoute } from './actions';
import {
  getCoachQuestionaryData,
  getCustomerQuestionaryData,
  getRegisterData,
  getUpdateUserData,
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
      data.role === UserRole.Default ? AppRoute.Main : AppRoute.Account,
    ),
  );
  return data;
});

export const registerAction = createAsyncThunk<
  LoggedUser,
  UserFiles,
  asyncThunkConfig
>('user/register', async (files, { getState, extra: api }) => {
  const formData = getRegisterData(getState(), files.avatar);
  const { data } = await api.post<LoggedUser>(APIRoute.Register, formData);
  const { accessToken, refreshToken } = data;
  saveTokens(accessToken, refreshToken);
  return data;
});

export const questionaryCustomerAction = createAsyncThunk<
  void,
  undefined,
  asyncThunkConfig
>(
  'user/questionary-customer',
  async (_arg, { getState, dispatch, extra: api }) => {
    const formData = getCustomerQuestionaryData(getState());
    await api.patch(APIRoute.QuestionaryUser, formData);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const questionaryCoachAction = createAsyncThunk<
  void,
  CertificatesFiles,
  asyncThunkConfig
>(
  'user/questionary-coach',
  async (files, { getState, dispatch, extra: api }) => {
    const formData = getCoachQuestionaryData(getState(), files.certificates);
    await api.patch(APIRoute.QuestionaryCoach, formData);
    dispatch(redirectToRoute(AppRoute.Account));
  },
);

export const getAuthUserAction = createAsyncThunk<
  AuthUser,
  undefined,
  asyncThunkConfig
>('account/user-data', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthUser>(APIRoute.AuthUser);
  return data;
});

export const updateUserAction = createAsyncThunk<
  AuthUser,
  UserFiles,
  asyncThunkConfig
>('user/update', async (files, { getState, extra: api }) => {
  const formData = getUpdateUserData(getState(), files.avatar);
  const { data } = await api.patch<AuthUser>(APIRoute.UpdateUser, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
});
