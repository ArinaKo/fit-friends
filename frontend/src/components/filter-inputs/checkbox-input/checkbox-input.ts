import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { WorkoutDuration } from '../../../const';
import {
  getWorkoutsFilterDuration,
  isWorkoutsListLoading,
  setWorkoutsDurationFilter,
} from '../../../store';
import { State } from '../../../types';

export enum CheckboxInputType {
  DurationOfWorkout = 'workout-duration',
}

type CheckboxInputTypeDiff = {
  name: string;
  filterSelector: (state: State) => string[];
  isDisabledSelector: (state: State) => boolean;
  setFilter: ActionCreatorWithPayload<string>;
  optionsArray: string[];
  optionsLabels?: string[];
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
    optionsLabels: Object.values(WorkoutDuration).map((option) => {
      const [from, to] = option.split('-');
      return `${from} мин - ${to} мин`;
    }),
  },
};
