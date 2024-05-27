import { MainData, MainPageData } from '../../types';
import { makeFakeUser, makeFakeWorkout } from '../../utils';
import { getMainPageDataAction } from '../api-actions';
import { mainData } from './main-data';

describe('MainData Slice', () => {
  const initialState: MainData = {
    workoutsForUser: [],
    specialWorkouts: [],
    popularWorkouts: [],
    readyUsers: [],
    isDataLoading: false,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = mainData.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = mainData.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" with "getMainPageDataAction.pending" action', () => {
      const expectedState: MainData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = mainData.reducer(
        initialState,
        getMainPageDataAction.pending,
      );

      expect(result).toEqual(expectedState);
    });

    it('should set isDataLoading to "false" with "getMainPageDataAction.rejected" action', () => {
      const expectedState: MainData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = mainData.reducer(
        initialState,
        getMainPageDataAction.rejected,
      );

      expect(result).toEqual(expectedState);
    });

    it('should set balances and isDataLoading to "false" with "getMainPageDataAction.fulfilled" action', () => {
      const actionPayload: MainPageData = {
        workoutsForUser: [makeFakeWorkout()],
        specialWorkouts: [makeFakeWorkout()],
        popularWorkouts: [makeFakeWorkout()],
        readyUsers: [makeFakeUser()],
      };
      const expectedState: MainData = {
        workoutsForUser: actionPayload.workoutsForUser,
        specialWorkouts: actionPayload.specialWorkouts,
        popularWorkouts: actionPayload.popularWorkouts,
        readyUsers: actionPayload.readyUsers,
        isDataLoading: false,
      };

      const result = mainData.reducer(
        initialState,
        getMainPageDataAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });
  });
});
