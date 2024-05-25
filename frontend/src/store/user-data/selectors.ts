import {
  MetroStation,
  NameSpace,
  UserLevel,
  UserSex,
  WorkoutType,
} from '../../const';
import { FileData, State } from '../../types';

export const getUserDataAvatar = (
  state: Pick<State, NameSpace.UserData>,
): FileData | undefined => state[NameSpace.UserData].avatar;

export const getUserDataName = (
  state: Pick<State, NameSpace.UserData>,
): string => state[NameSpace.UserData].name;

export const getUserDataIsReady = (
  state: Pick<State, NameSpace.UserData>,
): boolean => state[NameSpace.UserData].isReady;

export const getUserDataSex = (
  state: Pick<State, NameSpace.UserData>,
): UserSex => state[NameSpace.UserData].sex;

export const getUserDataLocation = (
  state: Pick<State, NameSpace.UserData>,
): MetroStation => state[NameSpace.UserData].location;

export const getUserDataLevel = (
  state: Pick<State, NameSpace.UserData>,
): UserLevel => state[NameSpace.UserData].level;

export const getUserDataWorkoutTypes = (
  state: Pick<State, NameSpace.UserData>,
): WorkoutType[] => state[NameSpace.UserData].workoutTypes;

export const getUserDataDescription = (
  state: Pick<State, NameSpace.UserData>,
): string => state[NameSpace.UserData].description;

export const getUserDataCalories = (
  state: Pick<State, NameSpace.UserData>,
): number => state[NameSpace.UserData].caloriesPerDay;

export const getUserDataCertificates = (
  state: Pick<State, NameSpace.UserData>,
): FileData[] => state[NameSpace.UserData].certificates;

export const isUserDataReady = (
  state: Pick<State, NameSpace.UserData>,
): boolean => state[NameSpace.UserData].isDataReady;

export const isUserDataUpdating = (
  state: Pick<State, NameSpace.UserData>,
): boolean => state[NameSpace.UserData].isDataUpdating;

export const isUserDataEditing = (
  state: Pick<State, NameSpace.UserData>,
): boolean => state[NameSpace.UserData].isDataEditing;
