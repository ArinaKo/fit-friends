import { BalancesList, BalancesWithPagination } from '../../types';
import { makeFakeBalance } from '../../utils';
import { getUserBalancesAction } from '../api-actions';
import { balancesList, setBalancesSorting } from './balance-list';

describe('BalanceList Slice', () => {
  const initialState: BalancesList = {
    balances: [],
    isDataLoading: false,
    isOnlyActive: false,
  };
  const payload: BalancesWithPagination = {
    balances: [makeFakeBalance()],
    totalPages: 1,
    totalItems: 1,
    currentPage: 1,
    itemsPerPage: 1,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = balancesList.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = balancesList.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set sorting with "setBalancesSorting" action', () => {
      const expectedResult = true;

      const result = balancesList.reducer(
        initialState,
        setBalancesSorting(expectedResult),
      );

      expect(result.isOnlyActive).toBe(expectedResult);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" with "getUserBalancesAction.pending" action', () => {
      const state: BalancesList = {
        ...initialState,
        isDataLoading: false,
      };

      const result = balancesList.reducer(state, getUserBalancesAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "false" with "getUserBalancesAction.rejected" action', () => {
      const state: BalancesList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = balancesList.reducer(
        state,
        getUserBalancesAction.rejected,
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should isDataLoading to "false" with "getUserBalancesAction.fulfilled" action', () => {
      const state: BalancesList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = balancesList.reducer(
        state,
        getUserBalancesAction.fulfilled(payload, '', undefined),
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set balances list with "getUserBalancesAction.fulfilled" action and because current page is 1', () => {
      const state: BalancesList = {
        ...initialState,
        balances: [],
      };
      const actionPayload: BalancesWithPagination = {
        ...payload,
        currentPage: 1,
      };
      const expectedState: BalancesList = {
        ...initialState,
        balances: actionPayload.balances,
      };

      const result = balancesList.reducer(
        state,
        getUserBalancesAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.balances).toEqual(expectedState.balances);
    });

    it('should add balances to list with "getUserBalancesAction.fulfilled" action and because current page more then 1', () => {
      const state: BalancesList = {
        ...initialState,
        balances: [makeFakeBalance()],
      };
      const actionPayload: BalancesWithPagination = {
        ...payload,
        currentPage: 2,
      };
      const expectedState: BalancesList = {
        ...initialState,
        balances: [...state.balances, ...actionPayload.balances],
      };

      const result = balancesList.reducer(
        state,
        getUserBalancesAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.balances).toEqual(expectedState.balances);
    });
  });
});
