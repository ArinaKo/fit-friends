import { NameSpace, OrdersSortType } from '../../const';
import { State, WorkoutOrders } from '../../types';

export const getOrdersList = (state: State): WorkoutOrders[] =>
  state[NameSpace.OrdersList].orders;

export const getOrdersListSortType = (state: State): OrdersSortType =>
  state[NameSpace.OrdersList].sorting.type;

export const isOrdersListSortDown = (state: State): boolean =>
  state[NameSpace.OrdersList].sorting.directionDown;

export const isOrdersListLoading = (state: State): boolean =>
  state[NameSpace.OrdersList].isDataLoading;
