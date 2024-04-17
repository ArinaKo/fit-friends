import { NameSpace } from '../../const';
import { State } from '../../types';

export const getUserFormEmail = (state: State): string =>
  state[NameSpace.UserForm].email;

export const getUserFormPassword = (state: State): string =>
  state[NameSpace.UserForm].password;

export const isUserFormDataSending = (state: State): boolean =>
  state[NameSpace.UserForm].isSending;
