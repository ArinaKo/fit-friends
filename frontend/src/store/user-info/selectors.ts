import {
  MetroStation,
  NameSpace,
  UserLevel,
  UserRole,
  WorkoutType,
} from '../../const';
import { FileData, State, Workout } from '../../types';

export const getUserId = (state: Pick<State, NameSpace.UserInfo>): string =>
  state[NameSpace.UserInfo].id;

export const getUserName = (state: Pick<State, NameSpace.UserInfo>): string =>
  state[NameSpace.UserInfo].name;

export const getUserReadyStatus = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].isReady;

export const isUserRoleCoach = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].role === UserRole.Coach;

export const getUserLocation = (
  state: Pick<State, NameSpace.UserInfo>,
): MetroStation => state[NameSpace.UserInfo].location;

export const getUserImages = (
  state: Pick<State, NameSpace.UserInfo>,
): FileData[] => state[NameSpace.UserInfo].images;

export const getUserWorkoutTypes = (
  state: Pick<State, NameSpace.UserInfo>,
): WorkoutType[] => state[NameSpace.UserInfo].workoutTypes;

export const getUserLevel = (
  state: Pick<State, NameSpace.UserInfo>,
): UserLevel => state[NameSpace.UserInfo].level;

export const getUserDescription = (
  state: Pick<State, NameSpace.UserInfo>,
): string => state[NameSpace.UserInfo].description;

export const isUserAFriend = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].isFriend;

export const getSubscriptionStatus = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].subscriptionStatus;

export const getUserCertificates = (
  state: Pick<State, NameSpace.UserInfo>,
): FileData[] => state[NameSpace.UserInfo].certificates;

export const getUserWorkouts = (
  state: Pick<State, NameSpace.UserInfo>,
): Workout[] => state[NameSpace.UserInfo].workouts;

export const isUserLoading = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].isDataLoading;

export const isUserInfoHasError = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].hasError;

export const isCoachInfoReady = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].isCoachInfoActual;

export const isCoachWorkoutsLoading = (
  state: Pick<State, NameSpace.UserInfo>,
): boolean => state[NameSpace.UserInfo].isWorkoutsLoading;
