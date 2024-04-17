import { NameSpace } from '../../const';
import { State } from '../../types';
import { AuthorizationStatus, UserRole } from '../../const';

export const isUserAuth = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Auth;

export const isAuthRequesting = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Unknown;

export const isUserCoach = (state: State): boolean =>
  state[NameSpace.AppData].userRole === UserRole.Coach;
