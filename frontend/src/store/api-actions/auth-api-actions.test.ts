import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { LoggedUser, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeState,
} from '../../utils';
import {
  checkAuthAction,
  loginAction,
  questionaryCoachAction,
  questionaryCustomerAction,
  registerAction,
} from './auth-api-actions';
import { APIRoute, UserRole } from '../../const';
import { redirectToRoute } from '../actions';
import * as tokenStorage from '../../services/token';
import * as userDataFunctions from '../../utils/user-form-data';

describe('Auth async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const fakeLoggedUser: LoggedUser = {
    id: 'id',
    role: UserRole.Default,
    accessToken: 'a-token',
    refreshToken: 'r-token',
  };
  const fakeFile = new File([], '');

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.CheckAuth).reply(200, fakeLoggedUser);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const checkAuthActionFulfilled = actions.at(1) as ReturnType<
        typeof checkAuthAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(checkAuthActionFulfilled.payload).toEqual(fakeLoggedUser);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.CheckAuth).reply(400);

      await store.dispatch(checkAuthAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute" and "loginAction.fulfilled" with thunk "loginAction', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeLoggedUser);

      await store.dispatch(loginAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const loginActionFulfilled = actions.at(2) as ReturnType<
        typeof loginAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);

      expect(loginActionFulfilled.payload).toEqual(fakeLoggedUser);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

    it('should call "saveToken" once with the received tokens', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeLoggedUser);
      const { accessToken, refreshToken } = fakeLoggedUser;
      const mockSaveTokens = vi.spyOn(tokenStorage, 'saveTokens');

      await store.dispatch(loginAction());

      expect(mockSaveTokens).toBeCalledTimes(1);
      expect(mockSaveTokens).toBeCalledWith(accessToken, refreshToken);
    });
  });

  describe('registerAction', () => {
    it('should dispatch "registerActionAction.pending" and "registerAction.fulfilled" with thunk "loginAction', async () => {
      mockAxiosAdapter.onPost(APIRoute.Register).reply(201, fakeLoggedUser);

      await store.dispatch(registerAction({ avatar: fakeFile }));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const registerActionFulfilled = actions.at(1) as ReturnType<
        typeof registerAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        registerAction.pending.type,
        registerAction.fulfilled.type,
      ]);

      expect(registerActionFulfilled.payload).toEqual(fakeLoggedUser);
    });

    it('should dispatch "registerAction.pending" and "registerAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Register).reply(400);

      await store.dispatch(registerAction({ avatar: fakeFile }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        registerAction.pending.type,
        registerAction.rejected.type,
      ]);
    });

    it('should call "saveToken" once with the received tokens', async () => {
      mockAxiosAdapter.onPost(APIRoute.Register).reply(201, fakeLoggedUser);
      const { accessToken, refreshToken } = fakeLoggedUser;
      const mockSaveTokens = vi.spyOn(tokenStorage, 'saveTokens');

      await store.dispatch(registerAction({ avatar: fakeFile }));

      expect(mockSaveTokens).toBeCalledTimes(1);
      expect(mockSaveTokens).toBeCalledWith(accessToken, refreshToken);
    });

    it('should call "getRegisterData" once with state and file', async () => {
      mockAxiosAdapter.onPost(APIRoute.Register).reply(200, fakeLoggedUser);
      const mockGetRegisterData = vi.spyOn(
        userDataFunctions,
        'getRegisterData',
      );

      await store.dispatch(registerAction({ avatar: fakeFile }));

      expect(mockGetRegisterData).toBeCalledTimes(1);
      expect(mockGetRegisterData).toBeCalledWith(store.getState(), fakeFile);
    });
  });

  describe('questionaryCustomerAction', () => {
    it('should dispatch "questionaryCustomerActionAction.pending", "redirectToRoute" and "questionaryCustomerAction.fulfilled" with thunk "loginAction', async () => {
      mockAxiosAdapter.onPatch(APIRoute.QuestionaryUser).reply(204);

      await store.dispatch(questionaryCustomerAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        questionaryCustomerAction.pending.type,
        redirectToRoute.type,
        questionaryCustomerAction.fulfilled.type,
      ]);
    });

    it('should dispatch "questionaryCustomerAction.pending" and "questionaryCustomerAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.QuestionaryUser).reply(400);

      await store.dispatch(questionaryCustomerAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        questionaryCustomerAction.pending.type,
        questionaryCustomerAction.rejected.type,
      ]);
    });

    it('should call "getCustomerQuestionaryData" once with state', async () => {
      mockAxiosAdapter
        .onPatch(APIRoute.QuestionaryUser)
        .reply(200, fakeLoggedUser);
      const mockGetCustomerQuestionaryData = vi.spyOn(
        userDataFunctions,
        'getCustomerQuestionaryData',
      );

      await store.dispatch(questionaryCustomerAction());

      expect(mockGetCustomerQuestionaryData).toBeCalledTimes(1);
      expect(mockGetCustomerQuestionaryData).toBeCalledWith(store.getState());
    });
  });

  describe('questionaryCoachAction', () => {
    it('should dispatch "questionaryCoachActionAction.pending", "redirectToRoute" and "questionaryCoachAction.fulfilled" with thunk "loginAction', async () => {
      mockAxiosAdapter.onPatch(APIRoute.QuestionaryCoach).reply(204);

      await store.dispatch(
        questionaryCoachAction({ certificates: [fakeFile] }),
      );
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        questionaryCoachAction.pending.type,
        redirectToRoute.type,
        questionaryCoachAction.fulfilled.type,
      ]);
    });

    it('should dispatch "questionaryCoachAction.pending" and "questionaryCoachAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.QuestionaryCoach).reply(400);

      await store.dispatch(
        questionaryCoachAction({ certificates: [fakeFile] }),
      );
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        questionaryCoachAction.pending.type,
        questionaryCoachAction.rejected.type,
      ]);
    });

    it('should call "getCoachQuestionaryData" once with state and files array', async () => {
      mockAxiosAdapter
        .onPatch(APIRoute.QuestionaryCoach)
        .reply(200, fakeLoggedUser);
      const mockGetCoachQuestionaryData = vi.spyOn(
        userDataFunctions,
        'getCoachQuestionaryData',
      );

      await store.dispatch(
        questionaryCoachAction({ certificates: [fakeFile] }),
      );

      expect(mockGetCoachQuestionaryData).toBeCalledTimes(1);
      expect(mockGetCoachQuestionaryData).toBeCalledWith(store.getState(), [
        fakeFile,
      ]);
    });
  });
});
