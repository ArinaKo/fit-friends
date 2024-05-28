import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeState,
} from '../../utils';

import { APIRoute } from '../../const';
import {
  subscribeToCoachAction,
  unsubscribeFromCoachAction,
} from './subscribe-api-actions';

describe('Subscribe async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const coachId = 'id';

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('subscribeToCoachAction', () => {
    it('should dispatch "subscribeToCoachAction.pending" and "subscribeToCoachAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPatch(`${APIRoute.SubscribeTo}/${coachId}`).reply(200);

      await store.dispatch(subscribeToCoachAction(coachId));
      const actionsTypes = extractActionsTypes(store.getActions());
      expect(actionsTypes).toEqual([
        subscribeToCoachAction.pending.type,
        subscribeToCoachAction.fulfilled.type,
      ]);
    });

    it('should dispatch "subscribeToCoachAction.pending" and "subscribeToCoachAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(`${APIRoute.SubscribeTo}/${coachId}`).reply(400);

      await store.dispatch(subscribeToCoachAction(coachId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        subscribeToCoachAction.pending.type,
        subscribeToCoachAction.rejected.type,
      ]);
    });
  });

  describe('unsubscribeFromCoachAction', () => {
    it('should dispatch "unsubscribeFromCoachAction.pending" and "unsubscribeFromCoachAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UnsubscribeFrom}/${coachId}`)
        .reply(200);

      await store.dispatch(unsubscribeFromCoachAction(coachId));
      const actionsTypes = extractActionsTypes(store.getActions());
      expect(actionsTypes).toEqual([
        unsubscribeFromCoachAction.pending.type,
        unsubscribeFromCoachAction.fulfilled.type,
      ]);
    });

    it('should dispatch "unsubscribeFromCoachAction.pending" and "unsubscribeFromCoachAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPatch(`${APIRoute.UnsubscribeFrom}/${coachId}`)
        .reply(400);

      await store.dispatch(unsubscribeFromCoachAction(coachId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        unsubscribeFromCoachAction.pending.type,
        unsubscribeFromCoachAction.rejected.type,
      ]);
    });
  });
});
