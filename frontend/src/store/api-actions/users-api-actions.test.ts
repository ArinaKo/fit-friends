import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {
  FriendshipStatus,
  FullUser,
  State,
  SubscriptionStatus,
  UsersWithPagination,
  WorkoutsWithPagination,
} from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeFileData,
  makeFakeState,
  makeFakeUser,
  makeFakeWorkout,
} from '../../utils';
import { APIRoute } from '../../const';
import {
  getAllUsersAction,
  getCoachDataAction,
  getUserAction,
} from './users-api-actions';
import * as queryDataFunctions from '../../utils/query';

describe('Users async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('getAllUsersAction', () => {
    const usersWithPagination: UsersWithPagination = {
      users: [makeFakeUser()],
      totalPages: 1,
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 1,
    };

    it('should dispatch "getAllUsersAction.pending" and "getAllUsersAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onGet(APIRoute.Users).reply(200, usersWithPagination);

      await store.dispatch(getAllUsersAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getAllUsersActionFulfilled = actions.at(1) as ReturnType<
        typeof getAllUsersAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getAllUsersAction.pending.type,
        getAllUsersAction.fulfilled.type,
      ]);

      expect(getAllUsersActionFulfilled.payload).toEqual(usersWithPagination);
    });

    it('should dispatch "getAllUsersAction.pending" and "getAllUsersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Users).reply(400);

      await store.dispatch(getAllUsersAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getAllUsersAction.pending.type,
        getAllUsersAction.rejected.type,
      ]);
    });

    it('should call "getAllUsersQuery" once with state', async () => {
      mockAxiosAdapter.onGet(APIRoute.Users).reply(200, usersWithPagination);
      const mockGetAllUsersQuery = vi.spyOn(
        queryDataFunctions,
        'getAllUsersQuery',
      );

      await store.dispatch(getAllUsersAction());

      expect(mockGetAllUsersQuery).toBeCalledTimes(1);
      expect(mockGetAllUsersQuery).toBeCalledWith(store.getState());
    });
  });

  describe('getUserAction', () => {
    const userId = 'id';
    const fullUserData: FullUser = {
      ...makeFakeUser(),
      isFriend: false,
      description: 'description',
      backgroundImage: makeFakeFileData(),
    };
    const friendshipStatus: FriendshipStatus = {
      isFriend: true,
    };

    it('should dispatch "getUserAction.pending" and "getUserAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Users}/${userId}`)
        .reply(200, fullUserData);
      mockAxiosAdapter
        .onGet(`${APIRoute.Friends}/${userId}`)
        .reply(200, friendshipStatus);
      const expectedPayload = {
        ...fullUserData,
        ...friendshipStatus,
      };

      await store.dispatch(getUserAction(userId));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getUserActionFulfilled = actions.at(1) as ReturnType<
        typeof getUserAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getUserAction.pending.type,
        getUserAction.fulfilled.type,
      ]);

      expect(getUserActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "getUserAction.pending" and "getUserAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Users}/${userId}`).reply(400);
      mockAxiosAdapter.onGet(`${APIRoute.Friends}/${userId}`).reply(400);

      await store.dispatch(getUserAction(userId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getUserAction.pending.type,
        getUserAction.rejected.type,
      ]);
    });
  });

  describe('getCoachDataAction', () => {
    const subscriptionStatus: SubscriptionStatus = {
      subscriptionStatus: true,
    };
    const workoutsWithPagination: WorkoutsWithPagination = {
      workouts: [makeFakeWorkout()],
      totalPages: 1,
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 1,
      priceRange: [0, 0],
      caloriesRange: [0, 0],
    };

    it('should dispatch "getCoachDataAction.pending" and "getCoachDataAction.fulfilled" with thunk "Action', async () => {
      const coachId = store.getState().USER_INFO?.id ?? '';
      mockAxiosAdapter
        .onGet(`${APIRoute.CheckSubscription}/${coachId}`)
        .reply(200, subscriptionStatus);
      mockAxiosAdapter
        .onGet(`${APIRoute.WorkoutsFromCoach}/${coachId}`)
        .reply(200, workoutsWithPagination);
      const expectedPayload = {
        ...subscriptionStatus,
        workouts: workoutsWithPagination.workouts,
      };

      await store.dispatch(getCoachDataAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getCoachDataActionFulfilled = actions.at(1) as ReturnType<
        typeof getCoachDataAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getCoachDataAction.pending.type,
        getCoachDataAction.fulfilled.type,
      ]);

      expect(getCoachDataActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "getCoachDataAction.pending" and "getCoachDataAction.rejected" when server response 400', async () => {
      const coachId = store.getState().USER_INFO?.id ?? '';
      mockAxiosAdapter
        .onGet(`${APIRoute.CheckSubscription}/${coachId}`)
        .reply(400);
      mockAxiosAdapter
        .onGet(`${APIRoute.WorkoutsFromCoach}/${coachId}`)
        .reply(400);

      await store.dispatch(getCoachDataAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getCoachDataAction.pending.type,
        getCoachDataAction.rejected.type,
      ]);
    });
  });
});
