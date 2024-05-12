import { NameSpace } from '../../const';
import { State, User } from '../../types';

export const getUsersList = (state: State): User[] =>
  state[NameSpace.UsersList].users;

export const getUsersFilterLocations = (state: State): string[] =>
  state[NameSpace.UsersList].filter.locations;

export const getUsersFilterTypes = (state: State): string[] =>
  state[NameSpace.UsersList].filter.types;

export const getUsersFilterLevel = (state: State): string =>
  state[NameSpace.UsersList].filter.level;

export const getUsersFilterRole = (state: State): string | undefined =>
  state[NameSpace.UsersList].filter.role;

export const isUsersListLoading = (state: State): boolean =>
  state[NameSpace.UsersList].isDataLoading;
