import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormAchievements,
  getUserFormAchievementsError,
  getUserFormDescription,
  getUserFormDescriptionError,
  getWorkoutFormDescription,
  getWorkoutFormDescriptionError,
  isUserFormDataSending,
  isWorkoutFormDataSending,
  setAchievements,
  setDescription,
  setUserFormError,
  setWorkoutDescription,
  setWorkoutFormError,
} from '../../../store';
import { State } from '../../../types';
import { validateAchievements, validateUserDescription, validateWorkoutDescription } from '../../../utils';

export enum TextAreaInputType {
  Achievements = 'achievements',
  UserDescription = 'user-description',
  WorkoutDescription = 'workout-description',
}

type TextAreaInputTypeDiff = {
  styleClass: string;
  valueSelector: (state: State) => string;
  errorSelector: (state: State) => string | undefined;
  validationFunction: (value: string) => string | undefined;
  setError: (value: string | undefined) => {
    payload: [string, string | undefined];
    type: string;
  };
  formStatusSelector: (state: State) => boolean;
  setValue: ActionCreatorWithPayload<string>;
  fieldName: string;
  labelText?: string;
};

type TextAreaInputTypeDiffs = {
  [TypeTextAreaInputType: string]: TextAreaInputTypeDiff;
};

export const TextAreaInputTypeDiffs: TextAreaInputTypeDiffs = {
  [TextAreaInputType.Achievements]: {
    styleClass: 'questionnaire-coach__textarea',
    valueSelector: getUserFormAchievements,
    errorSelector: getUserFormAchievementsError,
    validationFunction: validateAchievements,
    setError: (value: string | undefined) =>
      setUserFormError(['achievements', value]),
    formStatusSelector: isUserFormDataSending,
    setValue: setAchievements,
    fieldName: 'achievements',
  },
  [TextAreaInputType.UserDescription]: {
    styleClass: 'user-info-edit__textarea',
    valueSelector: getUserFormDescription,
    errorSelector: getUserFormDescriptionError,
    validationFunction: validateUserDescription,
    setError: (value: string | undefined) =>
      setUserFormError(['description', value]),
    formStatusSelector: isUserFormDataSending,
    setValue: setDescription,
    fieldName: 'description',
    labelText: 'Описание',
  },
  [TextAreaInputType.WorkoutDescription]: {
    styleClass: 'create-training__textarea',
    valueSelector: getWorkoutFormDescription,
    errorSelector: getWorkoutFormDescriptionError,
    validationFunction: validateWorkoutDescription,
    setError: (value: string | undefined) =>
      setWorkoutFormError(['description', value]),
    formStatusSelector: isWorkoutFormDataSending,
    setValue: setWorkoutDescription,
    fieldName: 'description',
  },
};
