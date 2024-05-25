import { NameSpace } from '../../const';
import { State, User, Workout } from '../../types';

export const getWorkoutsForUser = (
  state: Pick<State, NameSpace.MainData>,
): Workout[] => state[NameSpace.MainData].workoutsForUser;

export const getSpecialWorkouts = (
  state: Pick<State, NameSpace.MainData>,
): Workout[] => state[NameSpace.MainData].specialWorkouts;

export const getPopularWorkouts = (
  state: Pick<State, NameSpace.MainData>,
): Workout[] => state[NameSpace.MainData].popularWorkouts;

export const getReadyUsers = (state: Pick<State, NameSpace.MainData>): User[] =>
  state[NameSpace.MainData].readyUsers;

export const isMainDataLoading = (
  state: Pick<State, NameSpace.MainData>,
): boolean => state[NameSpace.MainData].isDataLoading;
