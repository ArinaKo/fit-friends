import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullWorkout, WorkoutsWithPagination } from '../../types';
import { APIRoute, AppRoute } from '../../const';
import { redirectToRoute } from '../actions';
import {
  getCreateWorkoutData,
  getCoachWorkoutsQuery,
  getAllWorkoutsQuery,
} from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const createWorkoutAction = createAsyncThunk<
  void,
  Blob,
  AsyncThunkConfig
>('workouts/create', async (file, { getState, dispatch, extra: api }) => {
  const formData = getCreateWorkoutData(getState(), file);
  await api.post(APIRoute.CreateWorkout, formData, {
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
    `${APIRoute.Workout}/${workoutId}`,
  );
  return data;
});

export const getAllWorkoutsAction = createAsyncThunk<
  WorkoutsWithPagination,
  undefined,
  AsyncThunkConfig
>('workouts/all-workouts', async (_arg, { getState, extra: api }) => {
  const params = getAllWorkoutsQuery(getState());
  const { data } = await api.get<WorkoutsWithPagination>(APIRoute.AllWorkout, {
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
