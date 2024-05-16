import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FullWorkout,
  WorkoutBalanceStatus,
  CommentsWithPagination,
  WorkoutsWithPagination,
  FileData,
} from '../../types';
import { APIRoute, AppRoute } from '../../const';
import { redirectToRoute } from '../actions';
import {
  getCreateWorkoutData,
  getCoachWorkoutsQuery,
  getAllWorkoutsQuery,
  getUpdateWorkoutData,
} from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const createWorkoutAction = createAsyncThunk<
  void,
  Blob,
  AsyncThunkConfig
>('workouts/create', async (file, { getState, dispatch, extra: api }) => {
  const formData = getCreateWorkoutData(getState(), file);
  await api.post(APIRoute.Workouts, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  dispatch(redirectToRoute(AppRoute.CoachWorkouts));
});

export const getWorkoutAction = createAsyncThunk<
  FullWorkout,
  string,
  AsyncThunkConfig
>('workouts/get-workout', async (workoutId, { extra: api }) => {
  const { data } = await api.get<FullWorkout>(
    `${APIRoute.Workouts}/${workoutId}`,
  );
  const { data: balancedData } = await api.get<WorkoutBalanceStatus>(
    `${APIRoute.Balances}/${workoutId}`,
  );
  const { data: commentsData } = await api.get<CommentsWithPagination>(
    `${APIRoute.Comments}/${workoutId}`,
  );
  return {
    ...data,
    balance: balancedData.count,
    comments: commentsData.comments,
  };
});

export const updateWorkoutAction = createAsyncThunk<
  FullWorkout,
  string,
  AsyncThunkConfig
>('workouts/update-workout', async (workoutId, { getState, extra: api }) => {
  const formData = getUpdateWorkoutData(getState());
  const { data } = await api.patch<FullWorkout>(
    `${APIRoute.UpdateWorkout}/${workoutId}`,
    formData,
  );
  return data;
});

export const updateWorkoutVideoAction = createAsyncThunk<
  FileData,
  { workoutId: string; video: Blob },
  AsyncThunkConfig
>('workouts/update-video', async (videoData, { extra: api }) => {
  const formData = new FormData();
  formData.append('video', videoData.video);
  const { data } = await api.patch<FileData>(
    `${APIRoute.UpdateWorkoutVideo}/${videoData.workoutId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
});

export const getAllWorkoutsAction = createAsyncThunk<
  WorkoutsWithPagination,
  undefined,
  AsyncThunkConfig
>('workouts/all-workouts', async (_arg, { getState, extra: api }) => {
  const params = getAllWorkoutsQuery(getState());
  const { data } = await api.get<WorkoutsWithPagination>(APIRoute.Workouts, {
    params,
  });
  return data;
});

export const getCoachWorkoutsAction = createAsyncThunk<
  WorkoutsWithPagination,
  undefined,
  AsyncThunkConfig
>('workouts/coach-workouts', async (_arg, { getState, extra: api }) => {
  const params = getCoachWorkoutsQuery(getState());
  const { data } = await api.get<WorkoutsWithPagination>(
    APIRoute.CoachWorkouts,
    { params },
  );
  return data;
});
