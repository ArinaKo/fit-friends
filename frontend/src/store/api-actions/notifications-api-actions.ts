import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '../../types';
import { APIRoute } from '../../const';
import { AsyncThunkConfig } from './async-thunk-config';

export const getUserNotificationsAction = createAsyncThunk<
  Notification[],
  undefined,
  AsyncThunkConfig
>('notifications/get', async (_arg, { extra: api }) => {
  const { data } = await api.get<Notification[]>(APIRoute.Notifications);
  return data;
});

export const deleteNotificationAction = createAsyncThunk<
  string,
  string,
  AsyncThunkConfig
>('notifications/delete', async (notificationId, { extra: api }) => {
  await api.delete(`${APIRoute.Notifications}/${notificationId}`);
  return notificationId;
});
