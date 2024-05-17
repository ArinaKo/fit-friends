import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { AsyncThunkConfig } from './async-thunk-config';
import { Comment, FullWorkout } from '../../types';
import { getCommentData } from '../../utils';

export const sendCommentAction = createAsyncThunk<
  { comment: Comment; rating: number },
  undefined,
  AsyncThunkConfig
>('comments/send', async (_arg, { getState, extra: api }) => {
  const formData = getCommentData(getState());
  const { data: newComment } = await api.post<Comment>(
    APIRoute.Comments,
    formData,
  );
  const { data: workout } = await api.get<FullWorkout>(
    `${APIRoute.Workouts}/${formData.workoutId}`,
  );
  return { comment: newComment, rating: workout.rating };
});
