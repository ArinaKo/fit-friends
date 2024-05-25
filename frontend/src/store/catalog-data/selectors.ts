import { NameSpace } from '../../const';
import { State } from '../../types';

export const getCatalogPage = (
  state: Pick<State, NameSpace.CatalogData>,
): number => state[NameSpace.CatalogData].currentPage;

export const isAllCatalogItems = (
  state: Pick<State, NameSpace.CatalogData>,
): boolean =>
  state[NameSpace.CatalogData].currentPage >=
  state[NameSpace.CatalogData].totalPages;

export const isCatalogScrollActive = (
  state: Pick<State, NameSpace.CatalogData>,
): boolean => state[NameSpace.CatalogData].totalPages !== 1;

export const isCatalogDataLoading = (
  state: Pick<State, NameSpace.CatalogData>,
): boolean => state[NameSpace.CatalogData].isDataLoading;
