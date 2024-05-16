import { NameSpace } from '../../const';
import { State, User, Workout } from '../../types';

export const getWorkoutsForUser = (state: State): Workout[] =>
  state[NameSpace.MainData].workoutsForUser;

export const getSpecialWorkouts = (state: State): Workout[] =>
  state[NameSpace.MainData].specialWorkouts;

export const getPopularWorkouts = (state: State): Workout[] =>
  state[NameSpace.MainData].popularWorkouts;

export const getReadyUsers = (state: State): User[] =>
  state[NameSpace.MainData].readyUsers;

export const isMainDataLoading = (state: State): boolean =>
  state[NameSpace.MainData].isDataLoading;
