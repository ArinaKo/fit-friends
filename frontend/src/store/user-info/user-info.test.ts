import { MetroStation, UserLevel, UserRole } from '../../const';
import { CoachInfo, FullUser, UserInfo } from '../../types';
import { makeFakeFileData, makeFakeUser, makeFakeWorkout } from '../../utils';
import {
  addUserToFriendsAction,
  getCoachDataAction,
  getUserAction,
  removeUserFromFriendsAction,
  subscribeToCoachAction,
  unsubscribeFromCoachAction,
} from '../api-actions';
import { userInfo } from './user-info';

describe('UserInfo Slice', () => {
  const initialState: UserInfo = {
    id: '',
    name: '',
    location: MetroStation.Petrogadskaya,
    role: UserRole.Default,
    isReady: false,
    description: '',
    workoutTypes: [],
    level: UserLevel.Amateur,
    isFriend: false,
    images: [],
    certificates: [],
    workouts: [],
    subscriptionStatus: false,
    isDataLoading: false,
    isCoachInfoActual: true,
    isWorkoutsLoading: false,
    hasError: false,
  };
  const fullUserData: FullUser = {
    ...makeFakeUser(),
    isFriend: true,
    description: 'description',
    backgroundImage: makeFakeFileData(),
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = userInfo.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = userInfo.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" and hasError to "false" with "getUserAction.pending" action', () => {
      const state: UserInfo = {
        ...initialState,
        isDataLoading: false,
        hasError: true,
      };
      const expectedResult: UserInfo = {
        ...initialState,
        isDataLoading: true,
        hasError: false,
      };

      const result = userInfo.reducer(state, getUserAction.pending);

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataLoading to "false" and hasError to "true" with "getUserAction.rejected" action', () => {
      const state: UserInfo = {
        ...initialState,
        isDataLoading: true,
        hasError: false,
      };
      const expectedResult: UserInfo = {
        ...initialState,
        isDataLoading: false,
        hasError: true,
      };

      const result = userInfo.reducer(state, getUserAction.rejected);

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataLoading and hasError to "false" and set user data with "getUserAction.fulfilled" action', () => {
      const state: UserInfo = {
        ...initialState,
        role: UserRole.Default,
        isDataLoading: true,
        hasError: true,
      };
      const expectedResult: UserInfo = {
        ...initialState,
        id: fullUserData.id,
        name: fullUserData.name,
        location: fullUserData.location,
        role: fullUserData.role,
        isReady: fullUserData.isReady,
        description: fullUserData.description,
        workoutTypes: fullUserData.workoutTypes,
        level: fullUserData.level,
        isFriend: fullUserData.isFriend,
        images: [fullUserData.backgroundImage],
        isDataLoading: false,
        hasError: false,
      };

      const result = userInfo.reducer(
        state,
        getUserAction.fulfilled(fullUserData, '', ''),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should set isCoachInfoActual to "false" with "getUserAction.fulfilled" action because user role is coach', () => {
      const state: UserInfo = {
        ...initialState,
        isCoachInfoActual: true,
      };

      const result = userInfo.reducer(
        state,
        getUserAction.fulfilled(
          { ...fullUserData, role: UserRole.Coach },
          '',
          '',
        ),
      );

      expect(result.isCoachInfoActual).toBe(false);
    });

    it('should set isWorkoutsLoading to "true" with "getCoachDataAction.pending" action', () => {
      const state: UserInfo = {
        ...initialState,
        isWorkoutsLoading: false,
      };

      const result = userInfo.reducer(state, getCoachDataAction.pending);

      expect(result.isWorkoutsLoading).toEqual(true);
    });

    it('should set isWorkoutsLoading to "false" and isCoachInfoActual to "true" with "getCoachDataAction.rejected" action', () => {
      const state: UserInfo = {
        ...initialState,
        isWorkoutsLoading: true,
        isCoachInfoActual: false,
      };
      const expectedResult: UserInfo = {
        ...initialState,
        isWorkoutsLoading: false,
        isCoachInfoActual: true,
      };

      const result = userInfo.reducer(state, getCoachDataAction.rejected);

      expect(result).toEqual(expectedResult);
    });

    it('should set isWorkoutsLoading to "false", isCoachInfoActual to "true", set workouts and subscription status with "getCoachDataAction.fulfilled" action', () => {
      const actionPayload: CoachInfo = {
        workouts: [makeFakeWorkout()],
        subscriptionStatus: true,
      };
      const state: UserInfo = {
        ...initialState,
        isWorkoutsLoading: true,
        isCoachInfoActual: false,
      };
      const expectedResult: UserInfo = {
        ...initialState,
        workouts: actionPayload.workouts,
        subscriptionStatus: actionPayload.subscriptionStatus,
        isWorkoutsLoading: false,
        isCoachInfoActual: true,
      };

      const result = userInfo.reducer(
        state,
        getCoachDataAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should set isFriend to "true" with "addUserToFriendsAction.fulfilled" action', () => {
      const state: UserInfo = {
        ...initialState,
        isFriend: false,
      };

      const result = userInfo.reducer(state, addUserToFriendsAction.fulfilled);

      expect(result.isFriend).toBe(true);
    });

    it('should set isFriend to "false" with "removeUserFromFriendsAction.fulfilled" action', () => {
      const state: UserInfo = {
        ...initialState,
        isFriend: false,
      };

      const result = userInfo.reducer(
        state,
        removeUserFromFriendsAction.fulfilled,
      );

      expect(result.isFriend).toBe(false);
    });

    it('should set subscription status to "true" with "subscribeToCoachAction.fulfilled" action', () => {
      const state: UserInfo = {
        ...initialState,
        subscriptionStatus: false,
      };

      const result = userInfo.reducer(state, subscribeToCoachAction.fulfilled);

      expect(result.subscriptionStatus).toBe(true);
    });

    it('should set subscription status to "false" with "unsubscribeFromCoachAction.fulfilled" action', () => {
      const state: UserInfo = {
        ...initialState,
        subscriptionStatus: true,
      };

      const result = userInfo.reducer(
        state,
        unsubscribeFromCoachAction.fulfilled,
      );

      expect(result.subscriptionStatus).toBe(false);
    });
  });
});
