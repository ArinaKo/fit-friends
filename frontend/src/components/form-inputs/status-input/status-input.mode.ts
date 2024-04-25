export enum StatusInputMode {
  Questionary = 'questionary',
  Account = 'account'
}

type StatusInputModeDiff = {
  blockStyleClass: string;
  iconStyleClass: string;
  labelStyleClass: string;
  labelText: string;
};

type StatusInputModeDiffs = {
  [mode: string]: StatusInputModeDiff;
};

export const StatusInputModeDiffs: StatusInputModeDiffs = {
  [StatusInputMode.Questionary]: {
    blockStyleClass: 'questionnaire-coach__checkbox',
    iconStyleClass: 'questionnaire-coach__checkbox-icon',
    labelStyleClass: 'questionnaire-coach__checkbox-label',
    labelText: 'Хочу дополнительно индивидуально тренировать',
  },
  [StatusInputMode.Account]: {
    blockStyleClass: 'custom-toggle custom-toggle--switch user-info-edit__toggle',
    iconStyleClass: 'custom-toggle__icon',
    labelStyleClass: 'custom-toggle__label',
    labelText: 'Готов тренировать',
  },
};
