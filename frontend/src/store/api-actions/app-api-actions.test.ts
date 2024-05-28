import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { MainPageData, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeState,
  makeFakeUser,
  makeFakeWorkout,
} from '../../utils';
import { APIRoute } from '../../const';
import { getMainPageDataAction } from './app-api-actions';

describe('App async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const fakeWorkouts = [makeFakeWorkout()];
  const fakeUsers = [makeFakeUser()];

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('getMainPageDataAction', () => {
    it('should dispatch "getMainPageDataAction.pending" and "getMainPageDataAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onGet(APIRoute.WorkoutsForUser).reply(200, fakeWorkouts);
      mockAxiosAdapter.onGet(APIRoute.SpecialWorkouts).reply(200, fakeWorkouts);
      mockAxiosAdapter.onGet(APIRoute.PopularWorkouts).reply(200, fakeWorkouts);
      mockAxiosAdapter.onGet(APIRoute.ReadyUsers).reply(200, fakeUsers);
      const expectedPayload: MainPageData = {
        workoutsForUser: fakeWorkouts,
        popularWorkouts: fakeWorkouts,
        specialWorkouts: fakeWorkouts,
        readyUsers: fakeUsers,
      };

      await store.dispatch(getMainPageDataAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getMainPageDataActionFulfilled = actions.at(1) as ReturnType<
        typeof getMainPageDataAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getMainPageDataAction.pending.type,
        getMainPageDataAction.fulfilled.type,
      ]);

      expect(getMainPageDataActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "getMainPageDataAction.pending" and "getMainPageDataAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.WorkoutsForUser).reply(400);
      mockAxiosAdapter.onGet(APIRoute.SpecialWorkouts).reply(400);
      mockAxiosAdapter.onGet(APIRoute.PopularWorkouts).reply(400);

      await store.dispatch(getMainPageDataAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getMainPageDataAction.pending.type,
        getMainPageDataAction.rejected.type,
      ]);
    });
  });
});
