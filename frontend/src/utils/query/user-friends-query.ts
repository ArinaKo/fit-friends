import { State } from '../../types';

export function getUserFriendsQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', currentPage.toString());
  return params;
}
