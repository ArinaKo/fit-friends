import { MetroStation, NameSpace, UserRole, UserSex } from '../../const';
import { State } from '../../types';

export const getUserFormEmail = (state: State): string =>
  state[NameSpace.UserForm].email;

export const getUserFormPassword = (state: State): string =>
  state[NameSpace.UserForm].password;

export const getUserFormName = (state: State): string =>
  state[NameSpace.UserForm].name;

export const getUserFormDateOfBirth = (state: State): string=>
  state[NameSpace.UserForm].dateOfBirth;

export const getUserFormSex = (state: State): UserSex =>
  state[NameSpace.UserForm].sex;

export const getUserFormRole = (state: State): UserRole =>
  state[NameSpace.UserForm].role;

export const getUserFormLocation = (state: State): MetroStation | undefined =>
  state[NameSpace.UserForm].location;

export const isUserFormDataSending = (state: State): boolean =>
  state[NameSpace.UserForm].isSending;
