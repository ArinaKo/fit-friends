import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { OrdersWithPagination, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeState,
  makeFakeWorkoutOrders,
} from '../../utils';
import { APIRoute } from '../../const';
import { createOrderAction, getCoachOrdersAction } from './orders-api-actions';
import * as ordersDataFunctions from '../../utils/order-form-data';
import * as queryDataFunctions from '../../utils/query';

describe('Orders async actions', () => {
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

  describe('getCoachOrdersAction', () => {
    const ordersWithPagination: OrdersWithPagination = {
      orders: [makeFakeWorkoutOrders()],
      totalPages: 1,
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 1,
    };

    it('should dispatch "getCoachOrdersAction.pending" and "getCoachOrdersAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.CoachOrders)
        .reply(200, ordersWithPagination);

      await store.dispatch(getCoachOrdersAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getCoachOrdersActionFulfilled = actions.at(1) as ReturnType<
        typeof getCoachOrdersAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getCoachOrdersAction.pending.type,
        getCoachOrdersAction.fulfilled.type,
      ]);

      expect(getCoachOrdersActionFulfilled.payload).toEqual(
        ordersWithPagination,
      );
    });

    it('should dispatch "getCoachOrdersAction.pending" and "getCoachOrdersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.CoachOrders).reply(400);

      await store.dispatch(getCoachOrdersAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getCoachOrdersAction.pending.type,
        getCoachOrdersAction.rejected.type,
      ]);
    });

    it('should call "getCoachOrdersQuery" once with state', async () => {
      mockAxiosAdapter
        .onGet(APIRoute.CoachWorkouts)
        .reply(200, ordersWithPagination);
      const mockGetCoachOrdersQuery = vi.spyOn(
        queryDataFunctions,
        'getCoachOrdersQuery',
      );

      await store.dispatch(getCoachOrdersAction());

      expect(mockGetCoachOrdersQuery).toBeCalledTimes(1);
      expect(mockGetCoachOrdersQuery).toBeCalledWith(store.getState());
    });
  });

  describe('createOrderAction', () => {
    const balanceStatus = {
      count: 3,
    };

    it('should dispatch "createOrderAction.pending" and "createOrderAction.fulfilled" with thunk "Action', async () => {
      const workoutId = store.getState().ORDER_FORM?.workoutId;
      mockAxiosAdapter.onPost(APIRoute.CreateOrder).reply(201);
      mockAxiosAdapter
        .onGet(`${APIRoute.Balances}/${workoutId ?? ''}`)
        .reply(200, balanceStatus);
      const expectedPayload = {
        newBalance: balanceStatus.count,
      };

      await store.dispatch(createOrderAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const createOrderActionFulfilled = actions.at(1) as ReturnType<
        typeof createOrderAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        createOrderAction.pending.type,
        createOrderAction.fulfilled.type,
      ]);

      expect(createOrderActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "createOrderAction.pending" and "createOrderAction.rejected" when server response 400', async () => {
      const workoutId = store.getState().ORDER_FORM?.workoutId;
      mockAxiosAdapter.onPost(APIRoute.CreateOrder).reply(201);
      mockAxiosAdapter
        .onGet(`${APIRoute.Balances}/${workoutId ?? ''}`)
        .reply(400);

      await store.dispatch(createOrderAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        createOrderAction.pending.type,
        createOrderAction.rejected.type,
      ]);
    });

    it('should call "getOrderData" once with state', async () => {
      const workoutId = store.getState().ORDER_FORM?.workoutId;
      mockAxiosAdapter.onPost(APIRoute.CreateOrder).reply(201);
      mockAxiosAdapter
        .onGet(`${APIRoute.Balances}/${workoutId ?? ''}`)
        .reply(200, balanceStatus);
      const mockGetOrderData = vi.spyOn(ordersDataFunctions, 'getOrderData');

      await store.dispatch(createOrderAction());

      expect(mockGetOrderData).toBeCalledTimes(1);
      expect(mockGetOrderData).toBeCalledWith(store.getState());
    });
  });
});
