import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormLevel,
  getUserFormLevelError,
  getUserFormLocation,
  getUserFormLocationError,
  getUserFormSex,
  getUserFormSexError,
  getWorkoutFormDuration,
  getWorkoutFormDurationError,
  getWorkoutFormLevel,
  getWorkoutFormLevelError,
  getWorkoutFormType,
  getWorkoutFormTypeError,
  isUserFormDataSending,
  isWorkoutFormDataSending,
  setDuration,
  setLevel,
  setLocation,
  setSex,
  setType,
  setUserFormError,
  setWorkoutFormError,
  setWorkoutLevel,
} from '../../../store';
import { State } from '../../../types';
import {
  MetroStation,
  UserLevel,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '../../../const';
import lodash from 'lodash';

export enum SelectInputType {
  Location = 'location',
  Sex = 'sex',
  Level = 'level',
  TypeOfWorkout = 'type-of-workout',
  DurationOfWorkout = 'duration-of-workout',
  LevelOfWorkout = 'level-of-workout',
}

type SelectInputTypeDiff = {
  valueSelector: (state: State) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  optionsArray: string[];
  optionsLabels?: string[];
  errorSelector: (state: State) => string | undefined;
  setError: (value: string | undefined) => {
    payload: [string, string | undefined];
    type: string;
  };
  formStatusSelector: (state: State) => boolean;
  labelText: string;
};

type SelectInputTypeDiffs = {
  [type: string]: SelectInputTypeDiff;
};

export const SelectInputTypeDiffs: SelectInputTypeDiffs = {
  [SelectInputType.Location]: {
    valueSelector: getUserFormLocation,
    setValue: setLocation,
    optionsArray: Object.values(MetroStation),
    optionsLabels: Object.values(MetroStation).map((option) => `ст. м. ${lodash.capitalize(option)}`),
    errorSelector: getUserFormLocationError,
    setError: (value: string | undefined) =>
      setUserFormError(['location', value]),
    formStatusSelector: isUserFormDataSending,
    labelText: 'Локация',
  },
  [SelectInputType.Sex]: {
    valueSelector: getUserFormSex,
    setValue: setSex,
    optionsArray: Object.values(UserSex),
    errorSelector: getUserFormSexError,
    setError: (value: string | undefined) =>
      setUserFormError(['sex', value]),
    formStatusSelector: isUserFormDataSending,
    labelText: 'Пол',
  },
  [SelectInputType.Level]: {
    valueSelector: getUserFormLevel,
    setValue: setLevel,
    optionsArray: Object.values(UserLevel),
    errorSelector: getUserFormLevelError,
    setError: (value: string | undefined) =>
      setUserFormError(['level', value]),
    formStatusSelector: isUserFormDataSending,
    labelText: 'Уровень',
  },
  [SelectInputType.TypeOfWorkout]: {
    valueSelector: getWorkoutFormType,
    setValue: setType,
    optionsArray: Object.values(WorkoutType),
    errorSelector: getWorkoutFormTypeError,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['type', value]),
    formStatusSelector: isWorkoutFormDataSending,
    labelText: 'Выберите тип тренировки',
  },
  [SelectInputType.DurationOfWorkout]: {
    valueSelector: getWorkoutFormDuration,
    setValue: setDuration,
    optionsArray: Object.values(WorkoutDuration),
    optionsLabels: Object.values(WorkoutDuration).map((option) => `${option} мин`),
    errorSelector: getWorkoutFormDurationError,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['duration', value]),
    formStatusSelector: isWorkoutFormDataSending,
    labelText: 'Сколько времени потратим',
  },
  [SelectInputType.LevelOfWorkout]: {
    valueSelector: getWorkoutFormLevel,
    setValue: setWorkoutLevel,
    optionsArray: Object.values(UserLevel),
    errorSelector: getWorkoutFormLevelError,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['level', value]),
    formStatusSelector: isWorkoutFormDataSending,
    labelText: 'Выберите уровень тренировки',
  },
};
