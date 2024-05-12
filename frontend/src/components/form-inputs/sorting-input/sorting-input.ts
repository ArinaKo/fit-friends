import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { State } from '../../../types';
import {
  getUsersFilterRole,
  getWorkoutsSortingType,
  isUsersListLoading,
  isWorkoutsListLoading,
  setUsersRoleFilter,
  setWorkoutsSorting,
} from '../../../store';
import { UserRole, WorkoutsSortType } from '../../../const';

const WorkoutsSortingText = {
  [WorkoutsSortType.PriceUp]: 'Дешевле',
  [WorkoutsSortType.PriceDown]: 'Дороже',
  [WorkoutsSortType.Free]: 'Бесплатные',
};

const UsersSortingText = {
  [UserRole.Coach]: 'Тренеры',
  [UserRole.Default]: 'Пользователи',
};

export enum SortingInputType {
  Workouts = 'workouts',
  Users = 'users',
}

type SortingInputTypeDiff = {
  sortingSelector: (state: State) => string | undefined;
  isDisabledSelector: (state: State) => boolean;
  setSorting: ActionCreatorWithPayload<string>;
  optionsEnum: object;
  optionsLabels: { [key: string]: string };
};

type SortingInputTypeDiffs = {
  [type: string]: SortingInputTypeDiff;
};

export const SortingInputTypeDiffs: SortingInputTypeDiffs = {
  [SortingInputType.Workouts]: {
    sortingSelector: getWorkoutsSortingType,
    isDisabledSelector: isWorkoutsListLoading,
    setSorting: setWorkoutsSorting,
    optionsEnum: WorkoutsSortType,
    optionsLabels: WorkoutsSortingText,
  },
  [SortingInputType.Users]: {
    sortingSelector: getUsersFilterRole,
    isDisabledSelector: isUsersListLoading,
    setSorting: setUsersRoleFilter,
    optionsEnum: UserRole,
    optionsLabels: UsersSortingText,
  },
};
