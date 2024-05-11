import { NameSpace } from '../../const';
import { State, User } from '../../types';

export const getUsersList = (state: State): User[] =>
  state[NameSpace.UsersList].users;

export const isUsersListLoading = (state: State): boolean =>
  state[NameSpace.UsersList].isDataLoading;
