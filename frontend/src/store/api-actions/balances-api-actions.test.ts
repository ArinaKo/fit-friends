import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { BalancesWithPagination, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeBalance,
  makeFakeState,
} from '../../utils';

import { APIRoute } from '../../const';
import {
  decreaseWorkoutBalanceAction,
  getUserBalancesAction,
} from './balances-api-actions';
import * as queryDataFunctions from '../../utils/query';

describe('Balances async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const balancesWithPagination: BalancesWithPagination = {
    balances: [makeFakeBalance()],
    totalPages: 1,
    totalItems: 1,
    currentPage: 1,
    itemsPerPage: 1,
  };

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('getUserBalancesAction', () => {
    it('should dispatch "getUserBalancesAction.pending" and "getUserBalancesAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Balances)
        .reply(200, balancesWithPagination);

      await store.dispatch(getUserBalancesAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getUserBalancesActionFulfilled = actions.at(1) as ReturnType<
        typeof getUserBalancesAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getUserBalancesAction.pending.type,
        getUserBalancesAction.fulfilled.type,
      ]);

      expect(getUserBalancesActionFulfilled.payload).toEqual(
        balancesWithPagination,
      );
    });

    it('should dispatch "getUserBalancesAction.pending" and "getUserBalancesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Balances).reply(400);

      await store.dispatch(getUserBalancesAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getUserBalancesAction.pending.type,
        getUserBalancesAction.rejected.type,
      ]);
    });

    it('should call "getUserBalancesQuery" once with state', async () => {
      mockAxiosAdapter
        .onPost(APIRoute.Register)
        .reply(200, balancesWithPagination);
      const mockGetUserBalancesQuery = vi.spyOn(
        queryDataFunctions,
        'getUserBalancesQuery',
      );

      await store.dispatch(getUserBalancesAction());

      expect(mockGetUserBalancesQuery).toBeCalledTimes(1);
      expect(mockGetUserBalancesQuery).toBeCalledWith(store.getState());
    });
  });

  describe('decreaseWorkoutBalanceAction', () => {
    it('should dispatch "decreaseWorkoutBalanceAction.pending" and "decreaseWorkoutBalanceAction.fulfilled" with thunk "Action', async () => {
      const workoutId = 'id';
      const balanceData = {
        count: 33,
      };
      mockAxiosAdapter
        .onPatch(`${APIRoute.DecreaseBalance}/${workoutId}`)
        .reply(200, balanceData);
      const expectedPayload = {
        ...balanceData,
        workoutId,
      };

      await store.dispatch(decreaseWorkoutBalanceAction(workoutId));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const decreaseWorkoutBalanceActionFulfilled = actions.at(1) as ReturnType<
        typeof decreaseWorkoutBalanceAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        decreaseWorkoutBalanceAction.pending.type,
        decreaseWorkoutBalanceAction.fulfilled.type,
      ]);

      expect(decreaseWorkoutBalanceActionFulfilled.payload).toEqual(
        expectedPayload,
      );
    });

    it('should dispatch "decreaseWorkoutBalanceAction.pending" and "decreaseWorkoutBalanceAction.rejected" when server response 400', async () => {
      const workoutId = 'id';
      mockAxiosAdapter
        .onPatch(`${APIRoute.DecreaseBalance}/${workoutId}`)
        .reply(400);

      await store.dispatch(decreaseWorkoutBalanceAction(workoutId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        decreaseWorkoutBalanceAction.pending.type,
        decreaseWorkoutBalanceAction.rejected.type,
      ]);
    });
  });
});
