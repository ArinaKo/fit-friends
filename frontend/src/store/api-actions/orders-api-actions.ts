import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersWithPagination } from '../../types';
import { APIRoute } from '../../const';
import { getCoachOrdersQuery } from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const getCoachOrdersAction = createAsyncThunk<
  OrdersWithPagination,
  undefined,
  AsyncThunkConfig
>('orders/coach-orders', async (_arg, { getState, extra: api }) => {
  const params = getCoachOrdersQuery(getState());
  const { data } = await api.get<OrdersWithPagination>(APIRoute.CoachOrders, {
    params,
  });
  return data;
});
