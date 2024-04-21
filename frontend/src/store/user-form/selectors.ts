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

export const getUserFormAvatar = (state: State): string | undefined =>
  state[NameSpace.UserForm].avatar;

export const getUserFormEmailError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.email;

export const getUserFormPasswordError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.password;

export const getUserFormNameError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.name;

export const getUserFormDateOfBirthError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.dateOfBirth;

export const getUserFormLocationError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.location;

export const getUserFormAvatarError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.avatar;

export const isUserFormHaveErrors = (state: State): boolean =>
  Object.values(state[NameSpace.UserForm].validationErrors).some((error) => error !== undefined);

export const isUserFormDataSending = (state: State): boolean =>
  state[NameSpace.UserForm].isSending;
