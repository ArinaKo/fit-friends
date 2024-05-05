import { NameSpace } from '../../const';
import { State, WorkoutBalance } from '../../types';

export const getBalancesList = (state: State): WorkoutBalance[] =>
  state[NameSpace.BalancesList].balances;

export const isOnlyActiveBalances = (state: State): boolean =>
  state[NameSpace.BalancesList].isOnlyActive;

export const isBalancesListLoading = (state: State): boolean =>
  state[NameSpace.BalancesList].isDataLoading;
