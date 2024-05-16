import { createAsyncThunk } from '@reduxjs/toolkit';
import { BalancesWithPagination, WorkoutBalanceStatus } from '../../types';
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
    APIRoute.Balances,
    {
      params,
    },
  );
  return data;
});

export const decreaseWorkoutBalanceAction = createAsyncThunk<
  WorkoutBalanceStatus & { workoutId: string },
  string,
  AsyncThunkConfig
>('balances/decrease-balance', async (workoutId, { extra: api }) => {
  const { data } = await api.patch<WorkoutBalanceStatus>(
    `${APIRoute.DecreaseBalance}/${workoutId}`,
  );
  return { ...data, workoutId };
});
