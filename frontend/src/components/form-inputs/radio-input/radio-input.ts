import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormLevel,
  getUserFormSex,
  getUserFormTimeForWorkout,
  getWorkoutFormUserSex,
  isUserFormDataSending,
  isWorkoutFormDataSending,
  setLevel,
  setSex,
  setTimeForWorkout,
  setUserSexFor,
} from '../../../store';
import { State } from '../../../types';
import { UserLevel, UserSex, WorkoutDuration, WorkoutSexFor } from '../../../const';

export enum RadioInputType {
  Level = 'level',
  Sex = 'sex',
  TimeForWorkout = 'time-for-workout',
  UserSexFor = 'user-sex-for',
}

enum StyleMode {
  Big = 'custom-toggle-radio--big',
}

type RadioInputTypeDiff = {
  valueSelector: (state: State) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  optionsArray: string[];
  optionsLabels?: string[];
  formStatusSelector: (state: State) => boolean;
  fieldName: string;
  styleMode?: StyleMode;
};

type RadioInputTypeDiffs = {
  [type: string]: RadioInputTypeDiff;
};

export const RadioInputTypeDiffs: RadioInputTypeDiffs = {
  [RadioInputType.Level]: {
    valueSelector: getUserFormLevel,
    setValue: setLevel,
    optionsArray: Object.values(UserLevel),
    formStatusSelector: isUserFormDataSending,
    fieldName: 'level',
    styleMode: StyleMode.Big,
  },
  [RadioInputType.Sex]: {
    valueSelector: getUserFormSex,
    setValue: setSex,
    optionsArray: Object.values(UserSex),
    formStatusSelector: isUserFormDataSending,
    fieldName: 'sex',
    styleMode: StyleMode.Big,
  },
  [RadioInputType.TimeForWorkout]: {
    valueSelector: getUserFormTimeForWorkout,
    setValue: setTimeForWorkout,
    optionsArray: Object.values(WorkoutDuration),
    optionsLabels: Object.values(WorkoutDuration).map((option) => `${option} мин`),
    formStatusSelector: isUserFormDataSending,
    fieldName: 'timeForWorkout',
    styleMode: StyleMode.Big,
  },
  [RadioInputType.UserSexFor]: {
    valueSelector: getWorkoutFormUserSex,
    setValue: setUserSexFor,
    optionsArray: Object.values(WorkoutSexFor),
    formStatusSelector: isWorkoutFormDataSending,
    fieldName: 'userSexFor',
  },
};
