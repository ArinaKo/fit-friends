import {
  AppRoute,
  AuthorizationStatus,
  NameSpace,
  PopupKey,
  UserRole,
} from '../../const';
import { AppData, Notification } from '../../types';
import { makeFakeNotification } from '../../utils';
import {
  getActivePopup,
  getCurrentPage,
  getNotifications,
  hasNotifications,
  isAuthRequesting,
  isUserAuth,
  isUserCoach,
} from './selectors';

describe('AppData selectors', () => {
  const state: AppData = {
    authStatus: AuthorizationStatus.Auth,
    userRole: undefined,
    userId: '',
    notifications: [makeFakeNotification()],
    activeWorkout: undefined,
    activePage: AppRoute.Main,
    activePopup: PopupKey.Comment,
  };

  it('should return "true" because authorization status is "Auth"', () => {
    const authStatus = AuthorizationStatus.Auth;
    const currentState = { ...state, authStatus };

    const result = isUserAuth({ [NameSpace.AppData]: currentState });

    expect(result).toBe(true);
  });

  it('should return "false" because authorization status is not "Auth"', () => {
    const authStatus = AuthorizationStatus.NoAuth;
    const currentState = { ...state, authStatus };

    const result = isUserAuth({ [NameSpace.AppData]: currentState });

    expect(result).toBe(false);
  });

  it('should return "true" because authorization status is "Unknown"', () => {
    const authStatus = AuthorizationStatus.Unknown;
    const currentState = { ...state, authStatus };

    const result = isAuthRequesting({ [NameSpace.AppData]: currentState });

    expect(result).toBe(true);
  });

  it('should return "false" because authorization status is not "Unknown"', () => {
    const authStatus = AuthorizationStatus.NoAuth;
    const currentState = { ...state, authStatus };

    const result = isAuthRequesting({ [NameSpace.AppData]: currentState });

    expect(result).toBe(false);
  });

  it('should return "true" because user role is coach', () => {
    const userRole = UserRole.Coach;
    const currentState = { ...state, userRole };

    const result = isUserCoach({ [NameSpace.AppData]: currentState });

    expect(result).toBe(true);
  });

  it('should return "false" because user role is not coach', () => {
    const userRole = undefined;
    const currentState = { ...state, userRole };

    const result = isUserCoach({ [NameSpace.AppData]: currentState });

    expect(result).toBe(false);
  });

  it('should return current page', () => {
    const { activePage } = state;

    const result = getCurrentPage({ [NameSpace.AppData]: state });

    expect(result).toBe(activePage);
  });

  it('should return notifications list', () => {
    const { notifications } = state;

    const result = getNotifications({ [NameSpace.AppData]: state });

    expect(result).toEqual(notifications);
  });

  it('should return "true" because notifications list is not empty', () => {
    const notifications = [makeFakeNotification()];
    const currentState = { ...state, notifications };

    const result = hasNotifications({ [NameSpace.AppData]: currentState });

    expect(result).toBe(true);
  });

  it('should return "false" because notifications list is empty', () => {
    const notifications: Notification[] = [];
    const currentState = { ...state, notifications };

    const result = hasNotifications({ [NameSpace.AppData]: currentState });

    expect(result).toBe(false);
  });

  it('should return active popup key', () => {
    const { activePopup } = state;

    const result = getActivePopup({ [NameSpace.AppData]: state });

    expect(result).toBe(activePopup);
  });
});
