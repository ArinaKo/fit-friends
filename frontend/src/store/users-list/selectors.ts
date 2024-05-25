import { NameSpace } from '../../const';
import { State, User } from '../../types';

export const getUsersList = (state: Pick<State, NameSpace.UsersList>): User[] =>
  state[NameSpace.UsersList].users;

export const getUsersFilterLocations = (
  state: Pick<State, NameSpace.UsersList>,
): string[] => state[NameSpace.UsersList].filter.locations;

export const getUsersFilterTypes = (
  state: Pick<State, NameSpace.UsersList>,
): string[] => state[NameSpace.UsersList].filter.types;

export const getUsersFilterLevel = (
  state: Pick<State, NameSpace.UsersList>,
): string => state[NameSpace.UsersList].filter.level;

export const getUsersFilterRole = (
  state: Pick<State, NameSpace.UsersList>,
): string | undefined => state[NameSpace.UsersList].filter.role;

export const isUsersListLoading = (
  state: Pick<State, NameSpace.UsersList>,
): boolean => state[NameSpace.UsersList].isDataLoading;
