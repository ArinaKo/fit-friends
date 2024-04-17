import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

type Route = (typeof AppRoute)[keyof typeof AppRoute];

export const redirectToRoute = createAction<Route>('app/redirectToRoute');
