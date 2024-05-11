import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getWorkoutDescription,
  getWorkoutFormDescription,
  getWorkoutFormDescriptionError,
  getWorkoutFormPrice,
  getWorkoutFormPriceError,
  getWorkoutFormTitle,
  getWorkoutFormTitleError,
  getWorkoutPrice,
  getWorkoutTitle,
  setPrice,
  setTitle,
  setWorkoutDescription,
  setWorkoutFormError,
} from '../../../store';
import { State } from '../../../types';
import {
  validateWorkoutDescription,
  validateWorkoutPrice,
  validateWorkoutTitle,
} from '../../../utils';

export enum WorkoutInputType {
  Title = 'title',
  Description = 'description',
  Price = 'price',
}

type WorkoutInputTypeDiff = {
  valueSelector: (state: State) => string;
  editedValueSelector: (state: State) => string;
  errorSelector: (state: State) => string | undefined;
  validationFunction: (value: string) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  setError: (value: string | undefined) => {
    payload: [string, string | undefined];
    type: string;
  };
  fieldName: string;
  labelText: string;
  isInput: boolean;
  inputSymbol?: string;
  styleClassMode?: string;
};

type WorkoutInputTypeDiffs = {
  [type: string]: WorkoutInputTypeDiff;
};

export const WorkoutInputTypeDiffs: WorkoutInputTypeDiffs = {
  [WorkoutInputType.Title]: {
    valueSelector: getWorkoutTitle,
    editedValueSelector: getWorkoutFormTitle,
    errorSelector: getWorkoutFormTitleError,
    validationFunction: validateWorkoutTitle,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['title', value]),
    setValue: setTitle,
    fieldName: 'title',
    labelText: 'Название тренировки',
    isInput: true,
    styleClassMode: 'training',
  },
  [WorkoutInputType.Description]: {
    valueSelector: getWorkoutDescription,
    editedValueSelector: getWorkoutFormDescription,
    errorSelector: getWorkoutFormDescriptionError,
    validationFunction: validateWorkoutDescription,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['description', value]),
    setValue: setWorkoutDescription,
    fieldName: 'description',
    labelText: 'Описание тренировки',
    isInput: false,
  },
  [WorkoutInputType.Price]: {
    valueSelector: getWorkoutPrice,
    editedValueSelector: getWorkoutFormPrice,
    errorSelector: getWorkoutFormPriceError,
    validationFunction: validateWorkoutPrice,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['price', value]),
    setValue: setPrice,
    fieldName: 'price',
    labelText: 'Стоимость',
    isInput: true,
    inputSymbol: ' ₽',
    styleClassMode: 'price',
  },
};
