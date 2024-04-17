import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const redirectToRoute = createAction<
  (typeof AppRoute)[keyof typeof AppRoute]
>('app/redirectToRoute');
