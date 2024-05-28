import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendsWithPagination, WorkoutRequest } from '../../types';
import { APIRoute } from '../../const';
import { getUserFriendsQuery } from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const getUserFriendsAction = createAsyncThunk<
  FriendsWithPagination,
  undefined,
  AsyncThunkConfig
>('friends/friends-list', async (_arg, { getState, extra: api }) => {
  const params = getUserFriendsQuery(getState());
  const { data } = await api.get<FriendsWithPagination>(APIRoute.Friends, {
    params,
  });
  return data;
});

export const addUserToFriendsAction = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>('friends/add', async (userId, { extra: api }) => {
  await api.patch(APIRoute.AddFriend, {
    friendId: userId,
  });
});

export const removeUserFromFriendsAction = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>('friends/remove', async (userId, { extra: api }) => {
  await api.patch(APIRoute.RemoveFriend, {
    friendId: userId,
  });
});

export const updateWorkoutRequestAction = createAsyncThunk<
  WorkoutRequest,
  WorkoutRequest,
  AsyncThunkConfig
>('friends/update-request', async (request, { extra: api }) => {
  await api.patch(APIRoute.UpdateWorkoutRequest, {
    requestId: request.id,
    status: request.status,
  });
  return request;
});

export const createWorkoutRequestAction = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>('friends/create-request', async (userId, { extra: api }) => {
  await api.post(APIRoute.CreateWorkoutRequest, {
    userToId: userId,
  });
});
