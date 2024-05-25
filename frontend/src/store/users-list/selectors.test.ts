import {
  MetroStation,
  NameSpace,
  UserLevel,
  UserRole,
  WorkoutType,
} from '../../const';
import { UsersList } from '../../types';
import { makeFakeUser } from '../../utils';
import {
  getUsersFilterLevel,
  getUsersFilterLocations,
  getUsersFilterRole,
  getUsersFilterTypes,
  getUsersList,
  isUsersListLoading,
} from './selectors';

describe('UsersList selectors', () => {
  const state: UsersList = {
    users: [makeFakeUser()],
    filter: {
      locations: [MetroStation.Avtovo],
      types: [WorkoutType.Aerobic],
      level: UserLevel.Beginner,
      role: UserRole.Coach,
    },
    isDataLoading: false,
  };

  it('should return users list', () => {
    const { users } = state;

    const result = getUsersList({ [NameSpace.UsersList]: state });

    expect(result).toEqual(users);
  });

  it('should return locations filter value', () => {
    const { locations } = state.filter;

    const result = getUsersFilterLocations({ [NameSpace.UsersList]: state });

    expect(result).toEqual(locations);
  });

  it('should return types filter value', () => {
    const { types } = state.filter;

    const result = getUsersFilterTypes({ [NameSpace.UsersList]: state });

    expect(result).toEqual(types);
  });

  it('should return level filter value', () => {
    const { level } = state.filter;

    const result = getUsersFilterLevel({ [NameSpace.UsersList]: state });

    expect(result).toBe(level);
  });

  it('should return role filter value', () => {
    const { role } = state.filter;

    const result = getUsersFilterRole({ [NameSpace.UsersList]: state });

    expect(result).toBe(role);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isUsersListLoading({ [NameSpace.UsersList]: state });

    expect(result).toBe(isDataLoading);
  });
});
