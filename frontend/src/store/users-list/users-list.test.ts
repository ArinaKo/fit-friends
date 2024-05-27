import { RequestStatus, UserLevel, UserRole } from '../../const';
import {
  UsersList,
  UsersWithPagination,
  FriendsWithPagination,
} from '../../types';
import { makeFakeUser } from '../../utils';
import {
  getAllUsersAction,
  getUserFriendsAction,
  updateWorkoutRequestAction,
} from '../api-actions';
import {
  resetUsersFilters,
  setUsersLevelFilter,
  setUsersLocationsFilter,
  setUsersRoleFilter,
  setUsersTypesFilter,
  usersList,
} from './users-list';

describe('UsersList Slice', () => {
  const initialState: UsersList = {
    users: [],
    filter: {
      locations: [],
      types: [],
      level: UserLevel.Beginner,
      role: undefined,
    },
    isDataLoading: false,
  };
  const payload: UsersWithPagination = {
    users: [makeFakeUser()],
    totalPages: 1,
    totalItems: 1,
    currentPage: 1,
    itemsPerPage: 1,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = usersList.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = usersList.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should reset filter with "resetUsersFilters" action', () => {
      const state: UsersList = {
        ...initialState,
        filter: {
          locations: ['metro'],
          types: ['box'],
          level: UserLevel.Pro,
          role: UserRole.Coach,
        },
      };

      const result = usersList.reducer(state, resetUsersFilters());

      expect(result.filter).toEqual(initialState.filter);
    });

    it('should add location to filter with "setUsersLocationsFilter" action because filter doesn\'t include payload value', () => {
      const actionPayload = 'Лесная';
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          locations: [],
        },
      };
      const expectedResult = [actionPayload];

      const result = usersList.reducer(
        state,
        setUsersLocationsFilter(actionPayload),
      );

      expect(result.filter.locations).toEqual(expectedResult);
    });

    it('should remove location from filter with "setUsersLocationsFilter" action because filter includes payload value', () => {
      const actionPayload = 'Лесная';
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          locations: [actionPayload],
        },
      };
      const expectedResult: string[] = [];

      const result = usersList.reducer(
        state,
        setUsersLocationsFilter(actionPayload),
      );

      expect(result.filter.locations).toEqual(expectedResult);
    });

    it('should add type to filter with "setUsersTypesFilter" action because filter doesn\'t include payload value', () => {
      const actionPayload = 'box';
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          types: [],
        },
      };
      const expectedResult = [actionPayload];

      const result = usersList.reducer(
        state,
        setUsersTypesFilter(actionPayload),
      );

      expect(result.filter.types).toEqual(expectedResult);
    });

    it('should remove type from filter with "setUsersTypesFilter" action because filter includes payload value', () => {
      const actionPayload = 'box';
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          types: [actionPayload],
        },
      };
      const expectedResult: string[] = [];

      const result = usersList.reducer(
        state,
        setUsersTypesFilter(actionPayload),
      );

      expect(result.filter.types).toEqual(expectedResult);
    });

    it('should set level filter with "setUsersLevelFilter" action', () => {
      const actionPayload = UserLevel.Pro;
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          level: UserLevel.Amateur,
        },
      };

      const result = usersList.reducer(
        state,
        setUsersLevelFilter(actionPayload),
      );

      expect(result.filter.level).toBe(actionPayload);
    });

    it('should set role filter with "setUsersRoleFilter" action', () => {
      const actionPayload = 'coach';
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          role: undefined,
        },
      };

      const result = usersList.reducer(
        state,
        setUsersRoleFilter(actionPayload),
      );

      expect(result.filter.role).toBe(actionPayload);
    });

    it('should set role filter to "undefined" with "setUsersRoleFilter" action because filter value equal payload value', () => {
      const actionPayload = 'coach';
      const state: UsersList = {
        ...initialState,
        filter: {
          ...initialState.filter,
          role: actionPayload,
        },
      };

      const result = usersList.reducer(
        state,
        setUsersRoleFilter(actionPayload),
      );

      expect(result.filter.role).toBe(undefined);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataLoading to "true" with "getUserFriendsAction.pending" action', () => {
      const state: UsersList = {
        ...initialState,
        isDataLoading: false,
      };

      const result = usersList.reducer(state, getUserFriendsAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "false" with "getUserFriendsAction.rejected" action', () => {
      const state: UsersList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = usersList.reducer(state, getUserFriendsAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should isDataLoading to "false" with "getUserFriendsAction.fulfilled" action', () => {
      const state: UsersList = {
        ...initialState,
        isDataLoading: true,
      };
      const actionPayload: FriendsWithPagination = {
        ...payload,
        friends: payload.users,
      };

      const result = usersList.reducer(
        state,
        getUserFriendsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set users list with "getUserFriendsAction.fulfilled" action and because current page is 1', () => {
      const state: UsersList = {
        ...initialState,
        users: [],
      };
      const actionPayload: FriendsWithPagination = {
        ...payload,
        friends: payload.users,
        currentPage: 1,
      };
      const expectedState: UsersList = {
        ...initialState,
        users: actionPayload.friends,
      };

      const result = usersList.reducer(
        state,
        getUserFriendsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.users).toEqual(expectedState.users);
    });

    it('should add users to list with "getUserFriendsAction.fulfilled" action and because current page more then 1', () => {
      const state: UsersList = {
        ...initialState,
        users: [makeFakeUser()],
      };
      const actionPayload: FriendsWithPagination = {
        ...payload,
        friends: payload.users,
        currentPage: 2,
      };
      const expectedState: UsersList = {
        ...initialState,
        users: [...state.users, ...actionPayload.friends],
      };

      const result = usersList.reducer(
        state,
        getUserFriendsAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.users).toEqual(expectedState.users);
    });

    it('should update workout request status with "updateWorkoutRequestAction.fulfilled" action', () => {
      const workoutRequest = {
        id: 'id',
        status: RequestStatus.Default,
      };
      const updatedRequest = {
        id: 'id',
        status: RequestStatus.Accepted,
      };
      const state: UsersList = {
        ...initialState,
        users: [{ ...makeFakeUser(), workoutRequest }],
      };
      const expectedResult = [
        { ...state.users[0], workoutRequest: updatedRequest },
      ];

      const result = usersList.reducer(
        state,
        updateWorkoutRequestAction.fulfilled(
          updatedRequest,
          '',
          updatedRequest,
        ),
      );

      expect(result.users).toEqual(expectedResult);
    });

    it('should set isDataLoading to "true" with "getAllUsersAction.pending" action', () => {
      const state: UsersList = {
        ...initialState,
        isDataLoading: false,
      };

      const result = usersList.reducer(state, getAllUsersAction.pending);

      expect(result.isDataLoading).toBe(true);
    });

    it('should set isDataLoading to "false" with "getAllUsersAction.rejected" action', () => {
      const state: UsersList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = usersList.reducer(state, getAllUsersAction.rejected);

      expect(result.isDataLoading).toBe(false);
    });

    it('should isDataLoading to "false" with "getAllUsersAction.fulfilled" action', () => {
      const state: UsersList = {
        ...initialState,
        isDataLoading: true,
      };

      const result = usersList.reducer(
        state,
        getAllUsersAction.fulfilled(payload, '', undefined),
      );

      expect(result.isDataLoading).toBe(false);
    });

    it('should set users list with "getAllUsersAction.fulfilled" action and because current page is 1', () => {
      const state: UsersList = {
        ...initialState,
        users: [],
      };
      const actionPayload: UsersWithPagination = {
        ...payload,
        currentPage: 1,
      };
      const expectedState: UsersList = {
        ...initialState,
        users: actionPayload.users,
      };

      const result = usersList.reducer(
        state,
        getAllUsersAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.users).toEqual(expectedState.users);
    });

    it('should add users to list with "getAllUsersAction.fulfilled" action and because current page more then 1', () => {
      const state: UsersList = {
        ...initialState,
        users: [makeFakeUser()],
      };
      const actionPayload: UsersWithPagination = {
        ...payload,
        currentPage: 2,
      };
      const expectedState: UsersList = {
        ...initialState,
        users: [...state.users, ...actionPayload.users],
      };

      const result = usersList.reducer(
        state,
        getAllUsersAction.fulfilled(actionPayload, '', undefined),
      );

      expect(result.users).toEqual(expectedState.users);
    });
  });
});
