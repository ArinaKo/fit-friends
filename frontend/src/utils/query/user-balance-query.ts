import { State } from '../../types';

export function getUserBalancesQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const { isOnlyActive } = state.BALANCES_LIST;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', currentPage.toString());
  params.append('active', isOnlyActive.toString());
  return params;
}
