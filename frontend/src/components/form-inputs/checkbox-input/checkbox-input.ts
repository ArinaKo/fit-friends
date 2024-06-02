import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { MetroStation, WorkoutDuration, WorkoutType } from '../../../const';
import {
  getUsersFilterLocations,
  getUsersFilterTypes,
  getWorkoutsFilterDuration,
  getWorkoutsFilterTypes,
  isUsersListLoading,
  isWorkoutsListLoading,
  setUsersLocationsFilter,
  setUsersTypesFilter,
  setWorkoutsDurationFilter,
  setWorkoutsTypesFilter,
} from '../../../store';
import { State } from '../../../types';
import lodash from 'lodash';

export enum CheckboxInputType {
  DurationOfWorkout = 'workout-duration',
  TypeOfWorkout = 'workout-type',
  UserLocation = 'user-location',
  UserWorkoutTypes = 'user-workout-types',
}

type CheckboxInputTypeDiff = {
  name: string;
  filterSelector: (state: State) => string[];
  isDisabledSelector: (state: State) => boolean;
  setFilter: ActionCreatorWithPayload<string>;
  optionsArray: string[];
  labelFunction: (value: string) => string;
  withButton: boolean;
};

type CheckboxInputTypeDiffs = {
  [type: string]: CheckboxInputTypeDiff;
};

export const CheckboxInputTypeDiffs: CheckboxInputTypeDiffs = {
  [CheckboxInputType.DurationOfWorkout]: {
    name: 'duration',
    filterSelector: getWorkoutsFilterDuration,
    isDisabledSelector: isWorkoutsListLoading,
    setFilter: setWorkoutsDurationFilter,
    optionsArray: Object.values(WorkoutDuration),
    labelFunction: (value) => {
      const [from, to] = value.split('-');
      return `${from} мин - ${to} мин`;
    },
    withButton: false,
  },
  [CheckboxInputType.TypeOfWorkout]: {
    name: 'type',
    filterSelector: getWorkoutsFilterTypes,
    isDisabledSelector: isWorkoutsListLoading,
    setFilter: setWorkoutsTypesFilter,
    optionsArray: Object.values(WorkoutType),
    labelFunction: (value) => value,
    withButton: false,
  },
  [CheckboxInputType.UserLocation]: {
    name: 'location',
    filterSelector: getUsersFilterLocations,
    isDisabledSelector: isUsersListLoading,
    setFilter: setUsersLocationsFilter,
    optionsArray: Object.values(MetroStation),
    labelFunction: (value) => value,
    withButton: true,
  },
  [CheckboxInputType.UserWorkoutTypes]: {
    name: 'workout-type',
    filterSelector: getUsersFilterTypes,
    isDisabledSelector: isUsersListLoading,
    setFilter: setUsersTypesFilter,
    optionsArray: Object.values(WorkoutType),
    labelFunction: (value) => lodash.capitalize(value),
    withButton: true,
  },
};
