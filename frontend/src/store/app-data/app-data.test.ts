import { AppRoute, AuthorizationStatus, PopupKey, UserRole } from '../../const';
import { AppData, LoggedUser } from '../../types';
import { makeFakeNotification } from '../../utils';
import {
  checkAuthAction,
  createOrderAction,
  decreaseWorkoutBalanceAction,
  deleteNotificationAction,
  getUserNotificationsAction,
  loginAction,
  registerAction,
  sendCommentAction,
} from '../api-actions';
import {
  appData,
  setActivePopup,
  setActiveRoute,
  setActiveWorkout,
} from './app-data';

describe('AppData Slice', () => {
  const initialState: AppData = {
    authStatus: AuthorizationStatus.Unknown,
    userRole: undefined,
    userId: '',
    notifications: [],
    activeWorkout: undefined,
    activePage: undefined,
    activePopup: undefined,
  };

  const loggedUserData: LoggedUser = {
    id: 'user-id',
    role: UserRole.Coach,
    accessToken: '',
    refreshToken: '',
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = appData.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = appData.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set active workout with "setActiveWorkout" action', () => {
      const expectedResult = 'active-workout-id';

      const result = appData.reducer(
        initialState,
        setActiveWorkout(expectedResult),
      );

      expect(result.activeWorkout).toBe(expectedResult);
    });

    it('should set active page with "setActiveRoute" action', () => {
      const expectedResult = AppRoute.Account;

      const result = appData.reducer(
        initialState,
        setActiveRoute(expectedResult),
      );

      expect(result.activePage).toBe(expectedResult);
    });

    it('should set active popup with "setActivePopup" action', () => {
      const expectedResult = PopupKey.Comment;

      const result = appData.reducer(
        initialState,
        setActivePopup(expectedResult),
      );

      expect(result.activePopup).toBe(expectedResult);
    });
  });
  describe('Api-actions check', () => {
    it('should set "Auth", user role and id with "checkAuthAction.fulfilled" action', () => {
      const expectedState: AppData = {
        ...initialState,
        authStatus: AuthorizationStatus.Auth,
        userId: loggedUserData.id,
        userRole: loggedUserData.role,
      };

      const result = appData.reducer(
        initialState,
        checkAuthAction.fulfilled(loggedUserData, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
      const expectedState: AppData = {
        ...initialState,
        authStatus: AuthorizationStatus.NoAuth,
      };

      const result = appData.reducer(initialState, checkAuthAction.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "Auth", user role and id with "loginAction.fulfilled" action', () => {
      const expectedState: AppData = {
        ...initialState,
        authStatus: AuthorizationStatus.Auth,
        userId: loggedUserData.id,
        userRole: loggedUserData.role,
      };

      const result = appData.reducer(
        initialState,
        loginAction.fulfilled(loggedUserData, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "Auth", user role and id with "registerAction.fulfilled" action', () => {
      const expectedState: AppData = {
        ...initialState,
        authStatus: AuthorizationStatus.Auth,
        userId: loggedUserData.id,
        userRole: loggedUserData.role,
      };

      const result = appData.reducer(
        initialState,
        registerAction.fulfilled(loggedUserData, '', {}),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set active workout with "decreaseWorkoutBalanceAction.fulfilled" action', () => {
      const actionPayload = {
        workoutId: 'workout-id',
        count: 5,
      };

      const result = appData.reducer(
        initialState,
        decreaseWorkoutBalanceAction.fulfilled(
          actionPayload,
          '',
          actionPayload.workoutId,
        ),
      );

      expect(result.activeWorkout).toBe(actionPayload.workoutId);
    });

    it('should set notifications with "getUserNotificationsAction.fulfilled" action', () => {
      const actionPayload = [makeFakeNotification()];

      const result = appData.reducer(
        initialState,
        getUserNotificationsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.notifications).toEqual(actionPayload);
    });

    it('should delete notification from list with "deleteNotificationAction.fulfilled" action', () => {
      const notification = makeFakeNotification();
      const state: AppData = {
        ...initialState,
        notifications: [notification],
      };

      const result = appData.reducer(
        state,
        deleteNotificationAction.fulfilled(
          notification.id,
          '',
          notification.id,
        ),
      );

      expect(result.notifications).toEqual([]);
    });

    it('should reset active popup with "sendCommentAction.fulfilled" action', () => {
      const expectedResult = undefined;

      const result = appData.reducer(initialState, sendCommentAction.fulfilled);

      expect(result.activePopup).toBe(expectedResult);
    });

    it('should reset active popup with "createOrderAction.fulfilled" action', () => {
      const expectedResult = undefined;

      const result = appData.reducer(initialState, createOrderAction.fulfilled);

      expect(result.activePopup).toBe(expectedResult);
    });
  });
});
