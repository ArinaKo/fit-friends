import { NameSpace, OrdersSortType } from '../../const';
import { OrdersList } from '../../types';
import { makeFakeWorkoutOrders } from '../../utils';
import {
  getOrdersList,
  getOrdersListSortType,
  isOrdersListLoading,
  isOrdersListSortDown,
} from './selectors';

describe('OrdersList selectors', () => {
  const state: OrdersList = {
    orders: [makeFakeWorkoutOrders()],
    isDataLoading: false,
    sorting: {
      type: OrdersSortType.Count,
      directionDown: true,
    },
  };

  it('should return orders list', () => {
    const { orders } = state;

    const result = getOrdersList({ [NameSpace.OrdersList]: state });

    expect(result).toEqual(orders);
  });

  it('should return sort type value', () => {
    const { type } = state.sorting;

    const result = getOrdersListSortType({ [NameSpace.OrdersList]: state });

    expect(result).toBe(type);
  });

  it('should return "directionDown" flag value', () => {
    const { directionDown } = state.sorting;

    const result = isOrdersListSortDown({ [NameSpace.OrdersList]: state });

    expect(result).toBe(directionDown);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isOrdersListLoading({ [NameSpace.OrdersList]: state });

    expect(result).toBe(isDataLoading);
  });
});
