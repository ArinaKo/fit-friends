export enum StatusInputMode {
  Questionary = 'questionary',
}

type StatusInputModeDiff = {
  iconStyleClass: string;
  labelStyleClass: string;
  labelText: string;
};

type StatusInputModeDiffs = {
  [mode: string]: StatusInputModeDiff;
};

export const StatusInputModeDiffs: StatusInputModeDiffs = {
  [StatusInputMode.Questionary]: {
    iconStyleClass: 'questionnaire-coach__checkbox-icon',
    labelStyleClass: 'questionnaire-coach__checkbox-label',
    labelText: 'Хочу дополнительно индивидуально тренировать',
  },
};
