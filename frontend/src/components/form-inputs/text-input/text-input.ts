import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  getUserFormEmail,
  getUserFormEmailError,
  getUserFormName,
  getUserFormNameError,
  getUserFormPassword,
  getUserFormPasswordError,
  setEmail,
  setName,
  setPassword,
} from '../../../store';
import { State } from '../../../types';
import { validateEmail, validateName, validatePassword } from '../../../utils';

export enum TextInputType {
  Name = 'name',
  Password = 'password',
  Email = 'email',
}

type TextInputTypeDiff = {
  valueSelector: (state: State) => string;
  errorSelector: (state: State) => string | undefined;
  validationFunction: (value: string) => string | undefined;
  setValue: ActionCreatorWithPayload<string>;
  errorFieldName: string;
  fieldType?: string;
};

type TextInputTypeDiffs = {
  [type: string]: TextInputTypeDiff;
};

export const TextInputTypeDiffs: TextInputTypeDiffs = {
  [TextInputType.Name]: {
    valueSelector: getUserFormName,
    errorSelector: getUserFormNameError,
    validationFunction: validateName,
    setValue: setName,
    errorFieldName: 'achievements',
  },
  [TextInputType.Password]: {
    valueSelector: getUserFormPassword,
    errorSelector: getUserFormPasswordError,
    validationFunction: validatePassword,
    setValue: setPassword,
    errorFieldName: 'password',
    fieldType: 'password',
  },
  [TextInputType.Email]: {
    valueSelector: getUserFormEmail,
    errorSelector: getUserFormEmailError,
    validationFunction: validateEmail,
    setValue: setEmail,
    errorFieldName: 'email',
  },
};
