import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormAchievements,
  getUserFormAchievementsError,
  getUserFormDescription,
  getUserFormDescriptionError,
  setAchievements,
  setDescription,
} from '../../../store';
import { State } from '../../../types';
import { validateAchievements, validateDescription } from '../../../utils';

export enum TextAreaInputType {
  Achievements = 'achievements',
  Description = 'description',
}

type TextAreaInputTypeDiff = {
  styleClass: string;
  valueSelector: (state: State) => string;
  errorSelector: (state: State) => string | undefined;
  validationFunction: (value: string) => string | undefined;
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
    setValue: setAchievements,
    fieldName: 'achievements',
  },
  [TextAreaInputType.Description]: {
    styleClass: 'user-info-edit__textarea',
    valueSelector: getUserFormDescription,
    errorSelector: getUserFormDescriptionError,
    validationFunction: validateDescription,
    setValue: setDescription,
    fieldName: 'description',
    labelText: 'Описание',
  },
};
