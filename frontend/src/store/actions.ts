import { createAction } from '@reduxjs/toolkit';
import { Route } from '../types';

export const redirectToRoute = createAction<Route>('app/redirectToRoute');
