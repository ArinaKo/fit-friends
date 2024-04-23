import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormAchievements,
  getUserFormAchievementsError,
  setAchievements,
} from '../../../store';
import { State } from '../../../types';
import { validateAchievements } from '../../../utils';

export enum TextAreaInputType {
  Achievements = 'achievements',
}

type TextAreaInputTypeDiff = {
  styleClass: string;
  valueSelector: (state: State) => string;
  errorSelector: (state: State) => string | undefined;
  validationFunction: (value: string) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  errorFieldName: string;
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
    errorFieldName: 'achievements',
  },
};
