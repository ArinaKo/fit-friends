import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { AsyncThunkConfig } from './async-thunk-config';

export const subscribeToCoachAction = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>('subscribe/add', async (coachId, { extra: api }) => {
  await api.patch(`${APIRoute.SubscribeTo}/${coachId}`);
});

export const unsubscribeFromCoachAction = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>('subscribe/remove', async (coachId, { extra: api }) => {
  await api.patch(`${APIRoute.UnsubscribeFrom}/${coachId}`);
});
