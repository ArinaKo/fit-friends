import { NameSpace } from '../../const';
import { State } from '../../types';

export const getCatalogPage = (state: State): number =>
  state[NameSpace.CatalogData].currentPage;

export const isAllCatalogItems = (state: State): boolean =>
  state[NameSpace.CatalogData].currentPage >=
  state[NameSpace.CatalogData].totalPages;

export const isCatalogScrollActive = (state: State): boolean =>
  state[NameSpace.CatalogData].totalPages === 1;

export const isCatalogMoreButtonDisabled = (state: State): boolean =>
  state[NameSpace.WorkoutsList].isDataLoading ||
  state[NameSpace.OrdersList].isDataLoading ||
  state[NameSpace.BalancesList].isDataLoading;