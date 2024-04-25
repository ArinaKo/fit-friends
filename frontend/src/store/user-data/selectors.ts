import { MetroStation, NameSpace, UserLevel, UserSex, WorkoutType } from '../../const';
import { FileData, State } from '../../types';

export const getUserDataAvatar = (state: State): FileData | undefined =>
  state[NameSpace.UserData].avatar;

export const getUserDataName = (state: State): string =>
  state[NameSpace.UserData].name;

export const getUserDataIsReady = (state: State): boolean =>
  state[NameSpace.UserData].isReady;

export const getUserDataSex = (state: State): UserSex =>
  state[NameSpace.UserData].sex;

export const getUserDataLocation = (state: State): MetroStation =>
  state[NameSpace.UserData].location;

export const getUserDataLevel = (state: State): UserLevel =>
  state[NameSpace.UserData].level;

export const getUserDataWorkoutTypes = (state: State): WorkoutType[] =>
  state[NameSpace.UserData].workoutTypes;

export const getUserDataDescription = (state: State): string =>
  state[NameSpace.UserData].description;

export const getUserDataCalories = (state: State): number =>
  state[NameSpace.UserData].caloriesPerDay;

export const getUserDataCertificates = (state: State): FileData[] =>
  state[NameSpace.UserData].certificates;

export const isUserDataReady = (state: State): boolean =>
  state[NameSpace.UserData].isDataReady;
