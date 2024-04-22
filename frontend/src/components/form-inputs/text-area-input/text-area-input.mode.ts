import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormAchievements,
  getUserFormAchievementsError,
  setAchievements,
} from '../../../store';
import { State } from '../../../types';
import { validateAchievements } from '../../../utils';

export enum TextAreaInputMode {
  Achievements = 'achievements',
}

type TextAreaInputModeDiff = {
  styleClass: string;
  valueSelector: (state: State) => string;
  errorSelector: (state: State) => string | undefined;
  validationFunction: (value: string) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  errorFieldName: string;
};

type TextAreaInputModeDiffs = {
  [mode: string]: TextAreaInputModeDiff;
};

export const TextAreaInputModeDiffs: TextAreaInputModeDiffs = {
  [TextAreaInputMode.Achievements]: {
    styleClass: 'questionnaire-coach__textarea',
    valueSelector: getUserFormAchievements,
    errorSelector: getUserFormAchievementsError,
    validationFunction: validateAchievements,
    setValue: setAchievements,
    errorFieldName: 'achievements',
  },
};
