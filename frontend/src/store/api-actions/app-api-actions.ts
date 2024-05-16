import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { AsyncThunkConfig } from './async-thunk-config';
import { MainPageData, User, Workout } from '../../types';

export const getMainPageDataAction = createAsyncThunk<
  MainPageData,
  undefined,
  AsyncThunkConfig
>('app/main-data', async (_arg, { extra: api }) => {
  const { data: workoutsForUser } = await api.get<Workout[]>(
    APIRoute.WorkoutsForUser,
  );
  const { data: specialWorkouts } = await api.get<Workout[]>(
    APIRoute.SpecialWorkouts,
  );
  const { data: popularWorkouts } = await api.get<Workout[]>(
    APIRoute.PopularWorkouts,
  );
  const { data: readyUsers } = await api.get<User[]>(APIRoute.ReadyUsers);
  return {
    workoutsForUser,
    specialWorkouts,
    popularWorkouts,
    readyUsers,
  };
});
