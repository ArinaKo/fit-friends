import {
  MetroStation,
  NameSpace,
  UserLevel,
  UserRole,
  WorkoutType,
} from '../../const';
import { FileData, State, Workout } from '../../types';

export const getUserId = (state: State): string => state[NameSpace.UserInfo].id;

export const getUserName = (state: State): string =>
  state[NameSpace.UserInfo].name;

export const getUserIsReady = (state: State): boolean =>
  state[NameSpace.UserInfo].isReady;

export const isUserRoleCoach = (state: State): boolean =>
  state[NameSpace.UserInfo].role === UserRole.Coach;

export const getUserLocation = (state: State): MetroStation =>
  state[NameSpace.UserInfo].location;

export const getUserImages = (state: State): FileData[] =>
  state[NameSpace.UserInfo].images;

export const getUserWorkoutTypes = (state: State): WorkoutType[] =>
  state[NameSpace.UserInfo].workoutTypes;

export const getUserLevel = (state: State): UserLevel =>
  state[NameSpace.UserInfo].level;

export const getUserDescription = (state: State): string =>
  state[NameSpace.UserInfo].description;

export const isUserAFriend = (state: State): boolean =>
  state[NameSpace.UserInfo].isFriend;

export const getSubscriptionStatus = (state: State): boolean =>
  state[NameSpace.UserInfo].subscriptionStatus;

export const getUserCertificates = (state: State): FileData[] =>
  state[NameSpace.UserInfo].certificates;

export const getUserWorkouts = (state: State): Workout[] =>
  state[NameSpace.UserInfo].workouts;

export const isUserStatus = (state: State): boolean =>
  state[NameSpace.UserInfo].isReady;

export const isUserLoading = (state: State): boolean =>
  state[NameSpace.UserInfo].isDataLoading;

export const isCoachInfoActual = (state: State): boolean =>
  state[NameSpace.UserInfo].isCoachInfoActual;

export const isCoachWorkoutsLoading = (state: State): boolean =>
  state[NameSpace.UserInfo].isWorkoutsLoading;
