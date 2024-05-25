import { NameSpace } from '../../const';
import { CatalogData } from '../../types';
import {
  getCatalogPage,
  isAllCatalogItems,
  isCatalogDataLoading,
  isCatalogScrollActive,
} from './selectors';

describe('CatalogData selectors', () => {
  const state: CatalogData = {
    limit: 10,
    totalPages: 5,
    totalItems: 43,
    currentPage: 2,
    itemsPerPage: 10,
    isDataLoading: false,
  };

  it('should return current catalog page', () => {
    const { currentPage } = state;

    const result = getCatalogPage({ [NameSpace.CatalogData]: state });

    expect(result).toBe(currentPage);
  });

  it('should return "true" because all item are loaded', () => {
    const currentPage = state.totalPages;
    const currentState = { ...state, currentPage };

    const result = isAllCatalogItems({ [NameSpace.CatalogData]: currentState });

    expect(result).toBe(true);
  });

  it('should return "false" because some items can be loaded', () => {
    const currentPage = state.totalPages - 1;
    const currentState = { ...state, currentPage };

    const result = isAllCatalogItems({ [NameSpace.CatalogData]: currentState });

    expect(result).toBe(false);
  });

  it('should return "true" because there are more pages then 1', () => {
    const totalPages = 2;
    const currentState = { ...state, totalPages };

    const result = isCatalogScrollActive({
      [NameSpace.CatalogData]: currentState,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because there is only one page', () => {
    const totalPages = 1;
    const currentState = { ...state, totalPages };

    const result = isCatalogScrollActive({
      [NameSpace.CatalogData]: currentState,
    });

    expect(result).toBe(false);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isCatalogDataLoading({ [NameSpace.CatalogData]: state });

    expect(result).toBe(isDataLoading);
  });
});
