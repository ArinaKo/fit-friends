import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormLevel,
  getUserFormLevelError,
  getUserFormLocation,
  getUserFormLocationError,
  getUserFormSex,
  getUserFormSexError,
  setLevel,
  setLocation,
  setSex,
} from '../../../store';
import { State } from '../../../types';
import { MetroStation, UserLevel, UserSex } from '../../../const';

export enum SelectInputType {
  Location = 'location',
  Sex = 'sex',
  Level = 'level',
}

type SelectInputTypeDiff = {
  valueSelector: (state: State) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  optionsArray: string[];
  errorSelector: (state: State) => string | undefined;
  errorFieldName: string;
  labelText: string;
};

type SelectInputTypeDiffs = {
  [type: string]: SelectInputTypeDiff;
};

export const SelectInputTypeDiffs: SelectInputTypeDiffs = {
  [SelectInputType.Location]: {
    valueSelector: getUserFormLocation,
    setValue: setLocation,
    optionsArray: Object.values(MetroStation),
    errorSelector: getUserFormLocationError,
    errorFieldName: 'location',
    labelText: 'Локация',
  },
  [SelectInputType.Sex]: {
    valueSelector: getUserFormSex,
    setValue: setSex,
    optionsArray: Object.values(UserSex),
    errorSelector: getUserFormSexError,
    errorFieldName: 'sex',
    labelText: 'Пол',
  },
  [SelectInputType.Level]: {
    valueSelector: getUserFormLevel,
    setValue: setLevel,
    optionsArray: Object.values(UserLevel),
    errorSelector: getUserFormLevelError,
    errorFieldName: 'level',
    labelText: 'Уровень',
  },
};
