import { State } from '../../types';

export function getAllUsersQuery(state: State): URLSearchParams {
  const { limit, currentPage } = state.CATALOG_DATA;
  const { locations, types, level, role } = state.USERS_LIST.filter;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', currentPage.toString());
  if (locations.length) {
    locations.forEach((item) => {
      params.append('locations', item);
    });
  }
  if (types.length) {
    types.forEach((item) => {
      params.append('workoutTypes', item);
    });
  }
  if (level) {
    params.append('level', level);
  }
  if (role) {
    params.append('role', role);
  }
  return params;
}
