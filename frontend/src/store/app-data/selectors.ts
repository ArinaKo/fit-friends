import { NameSpace } from '../../const';
import { AuthorizationStatus, State } from '../../types';

export const isUserAuth = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Auth;
