import { NameSpace, PopupKey } from '../../const';
import { Notification, Route, State } from '../../types';
import { AuthorizationStatus, UserRole } from '../../const';

export const isUserAuth = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Auth;

export const isAuthRequesting = (state: State): boolean =>
  state[NameSpace.AppData].authStatus === AuthorizationStatus.Unknown;

export const isUserCoach = (state: State): boolean =>
  state[NameSpace.AppData].userRole === UserRole.Coach;

export const getCurrentPage = (state: State): Route | undefined =>
  state[NameSpace.AppData].activePage;

export const getNotifications = (state: State): Notification[] =>
  state[NameSpace.AppData].notifications;

export const hasNotifications = (state: State): boolean =>
  state[NameSpace.AppData].notifications.length !== 0;

export const getActivePopup = (state: State): PopupKey | undefined =>
  state[NameSpace.AppData].activePopup;

