import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeNotification,
  makeFakeState,
} from '../../utils';
import { APIRoute } from '../../const';
import {
  deleteNotificationAction,
  getUserNotificationsAction,
} from './notifications-api-actions';

describe('Notification async actions', () => {
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

  describe('getUserNotificationsAction', () => {
    const fakeNotification = makeFakeNotification();
    const fakeNotifications = [
      { ...fakeNotification, date: String(fakeNotification.date) },
    ];

    it('should dispatch "getUserNotificationsAction.pending" and "getUserNotificationsAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.Notifications)
        .reply(200, fakeNotifications);

      await store.dispatch(getUserNotificationsAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getUserNotificationsActionFulfilled = actions.at(1) as ReturnType<
        typeof getUserNotificationsAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getUserNotificationsAction.pending.type,
        getUserNotificationsAction.fulfilled.type,
      ]);

      expect(getUserNotificationsActionFulfilled.payload).toEqual(
        fakeNotifications,
      );
    });

    it('should dispatch "getUserNotificationsAction.pending" and "getUserNotificationsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Notifications).reply(400);

      await store.dispatch(getUserNotificationsAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getUserNotificationsAction.pending.type,
        getUserNotificationsAction.rejected.type,
      ]);
    });
  });

  describe('deleteNotificationAction', () => {
    const notificationId = 'id';

    it('should dispatch "deleteNotificationAction.pending" and "deleteNotificationAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onDelete(`${APIRoute.Notifications}/${notificationId}`)
        .reply(200);

      await store.dispatch(deleteNotificationAction(notificationId));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const deleteNotificationActionFulfilled = actions.at(1) as ReturnType<
        typeof deleteNotificationAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        deleteNotificationAction.pending.type,
        deleteNotificationAction.fulfilled.type,
      ]);

      expect(deleteNotificationActionFulfilled.payload).toEqual(notificationId);
    });

    it('should dispatch "deleteNotificationAction.pending" and "deleteNotificationAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onDelete(`${APIRoute.Notifications}/${notificationId}`)
        .reply(400);

      await store.dispatch(deleteNotificationAction(notificationId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        deleteNotificationAction.pending.type,
        deleteNotificationAction.rejected.type,
      ]);
    });
  });
});
