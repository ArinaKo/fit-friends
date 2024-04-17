import { NameSpace } from '../../const';
import { AuthorizationStatus, State } from '../../types';
import { UserRole } from '../../types/user-role.enum';

export const isUserAuth = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Auth;

export const isAuthRequesting = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Unknown;

export const isUserCoach = (state: State): boolean =>
  state[NameSpace.AppData].userRole === UserRole.Coach;
