import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersWithPagination } from '../../types';
import { APIRoute } from '../../const';
import { getAllUsersQuery } from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const getAllUsersAction = createAsyncThunk<
  UsersWithPagination,
  undefined,
  AsyncThunkConfig
>('users/all-users', async (_arg, { getState, extra: api }) => {
  const params = getAllUsersQuery(getState());
  const { data } = await api.get<UsersWithPagination>(APIRoute.AllUsers, {
    params,
  });
  return data;
});
