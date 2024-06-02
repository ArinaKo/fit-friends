import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AuthUser, State } from '../../types';
import { Action } from '@reduxjs/toolkit';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeState,
  makeFakeUser,
  makeFakeFileData,
} from '../../utils';
import { APIRoute } from '../../const';
import {
  deleteCertificateAction,
  getAuthUserAction,
  updateCertificateAction,
  updateUserAction,
  uploadCertificateAction,
} from './account-api-actions';
import * as userDataFunctions from '../../utils/user-form-data';

describe('Account async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const authUserData: AuthUser = {
    ...makeFakeUser(),
    isFriend: true,
    description: 'description',
    backgroundImage: makeFakeFileData(),
  };
  const fakeFile = new File([], '');
  const fakeFileData = makeFakeFileData();

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  describe('getAuthUserAction', () => {
    it('should dispatch "getAuthUserAction.pending" and "getAuthUserAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onGet(APIRoute.AuthUser).reply(200, authUserData);

      await store.dispatch(getAuthUserAction());
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const getAuthUserActionFulfilled = actions.at(1) as ReturnType<
        typeof getAuthUserAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        getAuthUserAction.pending.type,
        getAuthUserAction.fulfilled.type,
      ]);

      expect(getAuthUserActionFulfilled.payload).toEqual(authUserData);
    });

    it('should dispatch "getAuthUserAction.pending" and "getAuthUserAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.AuthUser).reply(400);

      await store.dispatch(getAuthUserAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        getAuthUserAction.pending.type,
        getAuthUserAction.rejected.type,
      ]);
    });
  });

  describe('updateUserAction', () => {
    it('should dispatch "updateUserAction.pending" and "updateUserAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateUser).reply(200, authUserData);

      await store.dispatch(updateUserAction({}));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const updateUserActionFulfilled = actions.at(1) as ReturnType<
        typeof updateUserAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        updateUserAction.pending.type,
        updateUserAction.fulfilled.type,
      ]);

      expect(updateUserActionFulfilled.payload).toEqual(authUserData);
    });

    it('should dispatch "updateUserAction.pending" and "updateUserAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateUser).reply(400);

      await store.dispatch(updateUserAction({}));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        updateUserAction.pending.type,
        updateUserAction.rejected.type,
      ]);
    });

    it('should call "getUpdateUserData" once with state and file because action payload doesn\'t have file', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateUser).reply(200, authUserData);
      const mockGetUpdateUserData = vi.spyOn(
        userDataFunctions,
        'getUpdateUserData',
      );

      await store.dispatch(updateUserAction({}));

      expect(mockGetUpdateUserData).toBeCalledTimes(1);
      expect(mockGetUpdateUserData).toBeCalledWith(store.getState());
    });

    it('should call "getUpdateUserDataWithAvatar" once with state and file because action payload has file', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateUser).reply(200, authUserData);
      const mockGetUpdateUserDataWithAvatar = vi.spyOn(
        userDataFunctions,
        'getUpdateUserDataWithAvatar',
      );

      await store.dispatch(updateUserAction({ avatar: fakeFile }));

      expect(mockGetUpdateUserDataWithAvatar).toBeCalledTimes(1);
      expect(mockGetUpdateUserDataWithAvatar).toBeCalledWith(
        store.getState(),
        fakeFile,
      );
    });
  });

  describe('deleteCertificateAction', () => {
    it('should dispatch "deleteCertificateAction.pending" and "deleteCertificateAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onPatch(APIRoute.DeleteCertificate)
        .reply(200, [fakeFileData]);
      const certificateId = 'certificateId';

      await store.dispatch(deleteCertificateAction(certificateId));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const deleteCertificateActionFulfilled = actions.at(1) as ReturnType<
        typeof deleteCertificateAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        deleteCertificateAction.pending.type,
        deleteCertificateAction.fulfilled.type,
      ]);

      expect(deleteCertificateActionFulfilled.payload).toBe(certificateId);
    });

    it('should dispatch "deleteCertificateAction.pending" and "deleteCertificateAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.DeleteCertificate).reply(400);

      await store.dispatch(deleteCertificateAction(''));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        deleteCertificateAction.pending.type,
        deleteCertificateAction.rejected.type,
      ]);
    });
  });

  describe('updateCertificateAction', () => {
    it('should dispatch "updateCertificateAction.pending" and "updateCertificateAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onPatch(APIRoute.UpdateCertificate)
        .reply(200, fakeFileData);
      const actionPayload = {
        certificateId: 'id',
        newCertificate: fakeFile,
      };
      const expectedPayload = {
        oldCertificateId: actionPayload.certificateId,
        newCertificate: fakeFileData,
      };

      await store.dispatch(updateCertificateAction(actionPayload));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const updateCertificateActionFulfilled = actions.at(1) as ReturnType<
        typeof updateCertificateAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        updateCertificateAction.pending.type,
        updateCertificateAction.fulfilled.type,
      ]);

      expect(updateCertificateActionFulfilled.payload).toEqual(expectedPayload);
    });

    it('should dispatch "updateCertificateAction.pending" and "updateCertificateAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UpdateCertificate).reply(400);
      const actionPayload = {
        certificateId: 'id',
        newCertificate: fakeFile,
      };

      await store.dispatch(updateCertificateAction(actionPayload));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        updateCertificateAction.pending.type,
        updateCertificateAction.rejected.type,
      ]);
    });
  });

  describe('uploadCertificateAction', () => {
    it('should dispatch "uploadCertificateAction.pending" and "uploadCertificateAction.fulfilled" with thunk "Action', async () => {
      mockAxiosAdapter
        .onPatch(APIRoute.UploadCertificate)
        .reply(200, fakeFileData);
      const actionPayload = fakeFile;

      await store.dispatch(uploadCertificateAction(actionPayload));
      const actions = store.getActions();
      const actionsTypes = extractActionsTypes(actions);
      const uploadCertificateActionFulfilled = actions.at(1) as ReturnType<
        typeof uploadCertificateAction.fulfilled
      >;

      expect(actionsTypes).toEqual([
        uploadCertificateAction.pending.type,
        uploadCertificateAction.fulfilled.type,
      ]);

      expect(uploadCertificateActionFulfilled.payload).toEqual(fakeFileData);
    });

    it('should dispatch "uploadCertificateAction.pending" and "uploadCertificateAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPatch(APIRoute.UploadCertificate).reply(400);
      const actionPayload = fakeFile;

      await store.dispatch(uploadCertificateAction(actionPayload));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        uploadCertificateAction.pending.type,
        uploadCertificateAction.rejected.type,
      ]);
    });
  });
});
