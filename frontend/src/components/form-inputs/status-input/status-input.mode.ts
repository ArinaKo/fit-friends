import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { getUserFormStatus, setStatus } from '../../../store';
import { State } from '../../../types';

export enum StatusInputMode {
  Questionary = 'questionary',
}

type StatusInputModeDiff = {
  iconStyleClass: string;
  labelStyleClass: string;
  labelText: string;
  valueSelector: (state: State) => boolean;
  setValue: ActionCreatorWithPayload<boolean>;
};

type StatusInputModeDiffs = {
  [mode: string]: StatusInputModeDiff;
};

export const StatusInputModeDiffs: StatusInputModeDiffs = {
  [StatusInputMode.Questionary]: {
    iconStyleClass: 'questionnaire-coach__checkbox-icon',
    labelStyleClass: 'questionnaire-coach__checkbox-label',
    labelText: 'Хочу дополнительно индивидуально тренировать',
    valueSelector: getUserFormStatus,
    setValue: setStatus,
  },
};
