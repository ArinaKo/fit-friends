import { createAsyncThunk } from '@reduxjs/toolkit';
import { BalancesWithPagination } from '../../types';
import { APIRoute } from '../../const';
import { getUserBalancesQuery } from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const getUserBalancesAction = createAsyncThunk<
  BalancesWithPagination,
  undefined,
  AsyncThunkConfig
>('balances/user-balances', async (_arg, { getState, extra: api }) => {
  const params = getUserBalancesQuery(getState());
  const { data } = await api.get<BalancesWithPagination>(
    APIRoute.UserBalances,
    {
      params,
    },
  );
  return data;
});
