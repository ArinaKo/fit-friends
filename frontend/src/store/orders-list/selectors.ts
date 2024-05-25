import { NameSpace, OrdersSortType } from '../../const';
import { State, WorkoutOrders } from '../../types';

export const getOrdersList = (
  state: Pick<State, NameSpace.OrdersList>,
): WorkoutOrders[] => state[NameSpace.OrdersList].orders;

export const getOrdersListSortType = (
  state: Pick<State, NameSpace.OrdersList>,
): OrdersSortType => state[NameSpace.OrdersList].sorting.type;

export const isOrdersListSortDown = (
  state: Pick<State, NameSpace.OrdersList>,
): boolean => state[NameSpace.OrdersList].sorting.directionDown;

export const isOrdersListLoading = (
  state: Pick<State, NameSpace.OrdersList>,
): boolean => state[NameSpace.OrdersList].isDataLoading;
