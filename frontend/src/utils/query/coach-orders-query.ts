import { State } from '../../types';

export function getCoachOrdersQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const { type, directionDown } = state.ORDERS_LIST.sorting;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', currentPage.toString());
  params.append('sortingType', type);
  params.append('sortDirection', directionDown ? '-1' : '1');
  return params;
}
