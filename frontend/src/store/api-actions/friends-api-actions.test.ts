import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { FriendsWithPagination, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeState,
  makeFakeUser,
} from '../../utils';
import { APIRoute, RequestStatus } from '../../const';
import {
  addUserToFriendsAction,
  createWorkoutRequestAction,
  getUserFriendsAction,
  removeUserFromFriendsAction,
  updateWorkoutRequestAction,
} from './friends-api-actions';
import * as queryDataFunctions from '../../utils/query';

describe('Friends async actions', () => {
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

  describe('getUserFriendsAction', () => {
    const friendsWithPagination: FriendsWithPagination = {
      friends: [makeFakeUser()],
      totalPages: 1,
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 1,
    };

    it('should dispatch "getUserFriendsAction.pending" and "getUserFriendsAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Friends)
        .reply(200, friendsWithPagination);

      await store.dispatch(getUserFriendsAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getUserFriendsActionFulfilled = actions.at(1) as ReturnType<
        typeof getUserFriendsAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getUserFriendsAction.pending.type,
        getUserFriendsAction.fulfilled.type,
      ]);

      expect(getUserFriendsActionFulfilled.payload).toEqual(
        friendsWithPagination,
      );
    });

    it('should dispatch "getUserFriendsAction.pending" and "getUserFriendsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Friends).reply(400);

      await store.dispatch(getUserFriendsAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getUserFriendsAction.pending.type,
        getUserFriendsAction.rejected.type,
      ]);
    });

    it('should call "getUserFriendsQuery" once with state', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Friends)
        .reply(200, friendsWithPagination);
      const mockGetUserFriendsQuery = vi.spyOn(
        queryDataFunctions,
        'getUserFriendsQuery',
      );

      await store.dispatch(getUserFriendsAction());

      expect(mockGetUserFriendsQuery).toBeCalledTimes(1);
      expect(mockGetUserFriendsQuery).toBeCalledWith(store.getState());
    });
  });

  describe('addUserToFriendsAction', () => {
    it('should dispatch "addUserToFriendsAction.pending" and "addUserToFriendsAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPatch(APIRoute.AddFriend).reply(204);

      await store.dispatch(addUserToFriendsAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        addUserToFriendsAction.pending.type,
        addUserToFriendsAction.fulfilled.type,
      ]);
    });

    it('should dispatch "addUserToFriendsAction.pending" and "addUserToFriendsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.AddFriend).reply(400);

      await store.dispatch(addUserToFriendsAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        addUserToFriendsAction.pending.type,
        addUserToFriendsAction.rejected.type,
      ]);
    });
  });

  describe('removeUserFromFriendsAction', () => {
    it('should dispatch "removeUserFromFriendsAction.pending" and "removeUserFromFriendsAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPatch(APIRoute.RemoveFriend).reply(204);

      await store.dispatch(removeUserFromFriendsAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        removeUserFromFriendsAction.pending.type,
        removeUserFromFriendsAction.fulfilled.type,
      ]);
    });

    it('should dispatch "removeUserFromFriendsAction.pending" and "removeUserFromFriendsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.RemoveFriend).reply(400);

      await store.dispatch(removeUserFromFriendsAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        removeUserFromFriendsAction.pending.type,
        removeUserFromFriendsAction.rejected.type,
      ]);
    });
  });

  describe('updateWorkoutRequestAction', () => {
    const workoutRequest = {
      id: 'id',
      status: RequestStatus.Accepted,
    };
    it('should dispatch "updateWorkoutRequestAction.pending" and "updateWorkoutRequestAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateWorkoutRequest).reply(200);

      await store.dispatch(updateWorkoutRequestAction(workoutRequest));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const updateWorkoutRequestActionFulfilled = actions.at(1) as ReturnType<
        typeof updateWorkoutRequestAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        updateWorkoutRequestAction.pending.type,
        updateWorkoutRequestAction.fulfilled.type,
      ]);

      expect(updateWorkoutRequestActionFulfilled.payload).toEqual(
        workoutRequest,
      );
    });

    it('should dispatch "updateWorkoutRequestAction.pending" and "updateWorkoutRequestAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateWorkoutRequest).reply(400);

      await store.dispatch(updateWorkoutRequestAction(workoutRequest));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        updateWorkoutRequestAction.pending.type,
        updateWorkoutRequestAction.rejected.type,
      ]);
    });
  });

  describe('createWorkoutRequestAction', () => {
    it('should dispatch "createWorkoutRequestAction.pending" and "createWorkoutRequestAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPost(APIRoute.CreateWorkoutRequest).reply(201);

      await store.dispatch(createWorkoutRequestAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        createWorkoutRequestAction.pending.type,
        createWorkoutRequestAction.fulfilled.type,
      ]);
    });

    it('should dispatch "createWorkoutRequestAction.pending" and "createWorkoutRequestAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.CreateWorkoutRequest).reply(400);

      await store.dispatch(createWorkoutRequestAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        createWorkoutRequestAction.pending.type,
        createWorkoutRequestAction.rejected.type,
      ]);
    });
  });
});
