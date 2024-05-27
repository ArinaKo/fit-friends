import { OrdersSortType } from '../../const';
import { OrdersList, OrdersWithPagination } from '../../types';
import { makeFakeWorkoutOrders } from '../../utils';
import { getCoachOrdersAction } from '../api-actions';
import {
  ordersList,
  resetOrdersSorting,
  setOrdersSorting,
} from './orders-list';

describe('OrdersList Slice', () => {
  const initialState: OrdersList = {
    orders: [],
    isDataLoading: false,
    sorting: {
      type: OrdersSortType.Count,
      directionDown: true,
    },
  };
  const payload: OrdersWithPagination = {
    orders: [makeFakeWorkoutOrders()],
    totalPages: 1,
    totalItems: 1,
    currentPage: 1,
    itemsPerPage: 1,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = ordersList.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = ordersList.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should reset sorting with "resetOrdersSorting" action', () => {
      const state: OrdersList = {
        ...initialState,
        sorting: {
          type: OrdersSortType.Sum,
          directionDown: false,
        },
      };

      const result = ordersList.reducer(state, resetOrdersSorting());

      expect(result.sorting).toEqual(initialState.sorting);
    });

    it('should set sorting type with "setOrdersSorting"', () => {
      const actionPayload = OrdersSortType.Sum;

      const result = ordersList.reducer(
        initialState,
        setOrdersSorting(actionPayload),
      );

      expect(result.sorting.type).toBe(actionPayload);
    });

    it('should set sorting direction to default because "setOrdersSorting" action payload is different from state value', () => {
      const state: OrdersList = {
        ...initialState,
        sorting: {
          type: OrdersSortType.Sum,
          directionDown: false,
        },
      };
      const actionPayload = OrdersSortType.Count;

      const result = ordersList.reducer(state, setOrdersSorting(actionPayload));

      expect(result.sorting.directionDown).toBe(
        initialState.sorting.directionDown,
      );
    });

    it('should change sorting direction to default because "setOrdersSorting" action payload is the same as value in the state', () => {
      const state: OrdersList = {
        ...initialState,
        sorting: {
          type: OrdersSortType.Sum,
          directionDown: false,
        },
      };
      const actionPayload = OrdersSortType.Sum;

      const result = ordersList.reducer(state, setOrdersSorting(actionPayload));

      expect(result.sorting.directionDown).toBe(!state.sorting.directionDown);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" with "getCoachOrdersAction.pending" action', () => {
      const state: OrdersList = {
        ...initialState,
        isDataLoading: false,
      };

      const result = ordersList.reducer(state, getCoachOrdersAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "false" with "getCoachOrdersAction.rejected" action', () => {
      const state: OrdersList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = ordersList.reducer(state, getCoachOrdersAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should isDataLoading to "false" with "getCoachOrdersAction.fulfilled" action', () => {
      const state: OrdersList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = ordersList.reducer(
        state,
        getCoachOrdersAction.fulfilled(payload, '', undefined),
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set orders list with "getCoachOrdersAction.fulfilled" action and because current page is 1', () => {
      const state: OrdersList = {
        ...initialState,
        orders: [],
      };
      const actionPayload: OrdersWithPagination = {
        ...payload,
        currentPage: 1,
      };
      const expectedState: OrdersList = {
        ...initialState,
        orders: actionPayload.orders,
      };

      const result = ordersList.reducer(
        state,
        getCoachOrdersAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.orders).toEqual(expectedState.orders);
    });

    it('should add orders to list with "getCoachOrdersAction.fulfilled" action and because current page more then 1', () => {
      const state: OrdersList = {
        ...initialState,
        orders: [makeFakeWorkoutOrders()],
      };
      const actionPayload: OrdersWithPagination = {
        ...payload,
        currentPage: 2,
      };
      const expectedState: OrdersList = {
        ...initialState,
        orders: [...state.orders, ...actionPayload.orders],
      };

      const result = ordersList.reducer(
        state,
        getCoachOrdersAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.orders).toEqual(expectedState.orders);
    });
  });
});
