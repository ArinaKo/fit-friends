import {
  BalancesWithPagination,
  CatalogData,
  FriendsWithPagination,
  OrdersWithPagination,
  UsersWithPagination,
  WorkoutsWithPagination,
} from '../../types';
import {
  getAllUsersAction,
  getAllWorkoutsAction,
  getCoachOrdersAction,
  getCoachWorkoutsAction,
  getUserBalancesAction,
  getUserFriendsAction,
} from '../api-actions';
import {
  catalogData,
  increaseCatalogPage,
  resetCatalogData,
  resetCatalogPage,
} from './catalog-data';

describe('CatalogData Slice', () => {
  const initialState: CatalogData = {
    limit: 6,
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 0,
    isDataLoading: false,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = catalogData.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = catalogData.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set limit and reset other data with "resetCatalogData" action', () => {
      const actionPayload = 10;
      const state: CatalogData = {
        ...initialState,
        totalPages: 10,
        totalItems: 49,
        currentPage: 5,
        itemsPerPage: 5,
      };
      const expectedResult: CatalogData = {
        ...initialState,
        limit: actionPayload,
      };

      const result = catalogData.reducer(
        state,
        resetCatalogData(actionPayload),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should reset page with "resetCatalogPage" action', () => {
      const state: CatalogData = {
        ...initialState,
        currentPage: 5,
      };

      const result = catalogData.reducer(state, resetCatalogPage());

      expect(result.currentPage).toBe(initialState.currentPage);
    });

    it('should reset page with "increaseCatalogPage" action', () => {
      const expectedResult = initialState.currentPage + 1;

      const result = catalogData.reducer(initialState, increaseCatalogPage());

      expect(result.currentPage).toBe(expectedResult);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" with "getAllWorkoutsAction.pending" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = catalogData.reducer(state, getAllWorkoutsAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "true" with "getCoachWorkoutsAction.pending" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = catalogData.reducer(state, getCoachWorkoutsAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "true" with "getCoachOrdersAction.pending" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = catalogData.reducer(state, getCoachOrdersAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "true" with "getUserBalancesAction.pending" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = catalogData.reducer(state, getUserBalancesAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "true" with "getUserFriendsAction.pending" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = catalogData.reducer(state, getUserFriendsAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "true" with "getAllUsersAction.pending" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: false,
      };

      const result = catalogData.reducer(state, getAllUsersAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set catalog data with "getAllWorkoutsAction.fulfilled" action', () => {
      const actionPayload: WorkoutsWithPagination = {
        workouts: [],
        totalPages: 5,
        totalItems: 20,
        currentPage: 3,
        itemsPerPage: 4,
        priceRange: [0, 0],
        caloriesRange: [0, 0],
      };
      const expectedState: CatalogData = {
        ...initialState,
        totalPages: actionPayload.totalPages,
        totalItems: actionPayload.totalItems,
        itemsPerPage: actionPayload.itemsPerPage,
        isDataLoading: false,
      };

      const result = catalogData.reducer(
        initialState,
        getAllWorkoutsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set catalog data with "getCoachWorkoutsAction.fulfilled" action', () => {
      const actionPayload: WorkoutsWithPagination = {
        workouts: [],
        totalPages: 5,
        totalItems: 20,
        currentPage: 3,
        itemsPerPage: 4,
        priceRange: [0, 0],
        caloriesRange: [0, 0],
      };
      const expectedState: CatalogData = {
        ...initialState,
        totalPages: actionPayload.totalPages,
        totalItems: actionPayload.totalItems,
        itemsPerPage: actionPayload.itemsPerPage,
        isDataLoading: false,
      };

      const result = catalogData.reducer(
        initialState,
        getCoachWorkoutsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set catalog data with "getCoachOrdersAction.fulfilled" action', () => {
      const actionPayload: OrdersWithPagination = {
        orders: [],
        totalPages: 5,
        totalItems: 20,
        currentPage: 3,
        itemsPerPage: 4,
      };
      const expectedState: CatalogData = {
        ...initialState,
        totalPages: actionPayload.totalPages,
        totalItems: actionPayload.totalItems,
        itemsPerPage: actionPayload.itemsPerPage,
        isDataLoading: false,
      };

      const result = catalogData.reducer(
        initialState,
        getCoachOrdersAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set catalog data with "getUserBalancesAction.fulfilled" action', () => {
      const actionPayload: BalancesWithPagination = {
        balances: [],
        totalPages: 5,
        totalItems: 20,
        currentPage: 3,
        itemsPerPage: 4,
      };
      const expectedState: CatalogData = {
        ...initialState,
        totalPages: actionPayload.totalPages,
        totalItems: actionPayload.totalItems,
        itemsPerPage: actionPayload.itemsPerPage,
        isDataLoading: false,
      };

      const result = catalogData.reducer(
        initialState,
        getUserBalancesAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set catalog data with "getUserFriendsAction.fulfilled" action', () => {
      const actionPayload: FriendsWithPagination = {
        friends: [],
        totalPages: 5,
        totalItems: 20,
        currentPage: 3,
        itemsPerPage: 4,
      };
      const expectedState: CatalogData = {
        ...initialState,
        totalPages: actionPayload.totalPages,
        totalItems: actionPayload.totalItems,
        itemsPerPage: actionPayload.itemsPerPage,
        isDataLoading: false,
      };

      const result = catalogData.reducer(
        initialState,
        getUserFriendsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set catalog data with "getAllUsersAction.fulfilled" action', () => {
      const actionPayload: UsersWithPagination = {
        users: [],
        totalPages: 5,
        totalItems: 20,
        currentPage: 3,
        itemsPerPage: 4,
      };
      const expectedState: CatalogData = {
        ...initialState,
        totalPages: actionPayload.totalPages,
        totalItems: actionPayload.totalItems,
        itemsPerPage: actionPayload.itemsPerPage,
        isDataLoading: false,
      };

      const result = catalogData.reducer(
        initialState,
        getAllUsersAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set isDataLoading to "false" with "getAllWorkoutsAction.rejected" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = catalogData.reducer(state, getAllWorkoutsAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should set isDataLoading to "false" with "getCoachWorkoutsAction.rejected" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = catalogData.reducer(
        state,
        getCoachWorkoutsAction.rejected,
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set isDataLoading to "false" with "getCoachOrdersAction.rejected" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = catalogData.reducer(state, getCoachOrdersAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should set isDataLoading to "false" with "getUserBalancesAction.rejected" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = catalogData.reducer(state, getUserBalancesAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should set isDataLoading to "false" with "getUserFriendsAction.rejected" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = catalogData.reducer(state, getUserFriendsAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should set isDataLoading to "false" with "getAllUsersAction.rejected" action', () => {
      const state: CatalogData = {
        ...initialState,
        isDataLoading: true,
      };

      const result = catalogData.reducer(state, getAllUsersAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });
  });
});
