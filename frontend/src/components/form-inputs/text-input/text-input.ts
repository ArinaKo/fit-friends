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
  fieldName: string;
  labelText: string;
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
    fieldName: 'name',
    labelText: 'Имя'
  },
  [TextInputType.Password]: {
    valueSelector: getUserFormPassword,
    errorSelector: getUserFormPasswordError,
    validationFunction: validatePassword,
    setValue: setPassword,
    fieldName: 'password',
    labelText: 'Пароль',
    fieldType: 'password',
  },
  [TextInputType.Email]: {
    valueSelector: getUserFormEmail,
    errorSelector: getUserFormEmailError,
    validationFunction: validateEmail,
    setValue: setEmail,
    fieldName: 'email',
    labelText: 'E-mail',
  },
};
