import { MetroStation, UserLevel, UserSex } from '../../const';
import { AuthUser, UserData } from '../../types';
import { makeFakeFileData, makeFakeUser } from '../../utils';
import {
  deleteCertificateAction,
  getAuthUserAction,
  updateCertificateAction,
  updateUserAction,
  uploadCertificateAction,
} from '../api-actions';
import { setUserEditingStatus, userData } from './user-data';

describe('UserData Slice', () => {
  const initialState: UserData = {
    name: '',
    location: MetroStation.Petrogadskaya,
    avatar: undefined,
    sex: UserSex.Other,
    level: UserLevel.Amateur,
    description: '',
    isReady: false,
    workoutTypes: [],
    caloriesToLose: 0,
    caloriesPerDay: 0,
    certificates: [],
    isDataReady: false,
    isDataUpdating: false,
    isDataEditing: false,
  };
  const authUserData: AuthUser = {
    ...makeFakeUser(),
    isFriend: true,
    description: 'description',
    backgroundImage: makeFakeFileData(),
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = userData.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = userData.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set editing status with "setUserEditingStatus" action', () => {
      const actionPayload = true;
      const state: UserData = {
        ...initialState,
        isDataEditing: false,
      };

      const result = userData.reducer(
        state,
        setUserEditingStatus(actionPayload),
      );

      expect(result.isDataEditing).toBe(actionPayload);
    });
  });

  describe('Api-actions check', () => {
    it('should set isDataReady to "true" and user data with "getAuthUserAction.fulfilled" action', () => {
      const expectedState: UserData = {
        ...initialState,
        name: authUserData.name,
        location: authUserData.location,
        avatar: authUserData.avatar,
        level: authUserData.level,
        sex: authUserData.sex,
        isReady: authUserData.isReady,
        description: authUserData.description,
        workoutTypes: authUserData.workoutTypes,
        isDataReady: true,
      };

      const result = userData.reducer(
        initialState,
        getAuthUserAction.fulfilled(authUserData, '', undefined),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set isDataUpdating to "true" with "updateUserAction.pending" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: false,
      };

      const result = userData.reducer(state, updateUserAction.pending);

      expect(result.isDataUpdating).toBe(true);
    });

    it('should set isDataUpdating to "false" with "updateUserAction.rejected" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: true,
      };

      const result = userData.reducer(state, updateUserAction.rejected);

      expect(result.isDataUpdating).toBe(false);
    });

    it('should update user data, set isDataUpdating to "false" and isDataEditing to "false" with "updateUserAction.fulfilled" action', () => {
      const state: UserData = {
        ...initialState,
        ...authUserData,
        isDataUpdating: true,
        isDataEditing: true,
      };
      const actionPayload: AuthUser = {
        ...authUserData,
        name: 'newName',
        avatar: undefined,
        isReady: !authUserData.isReady,
        description: 'newDescription',
      };
      const expectedResult: UserData = {
        ...state,
        name: actionPayload.name,
        avatar: actionPayload.avatar,
        isReady: actionPayload.isReady,
        description: actionPayload.description,
        isDataUpdating: false,
        isDataEditing: false,
      };

      const result = userData.reducer(
        state,
        updateUserAction.fulfilled(actionPayload, '', {}),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataUpdating to "true" with "uploadCertificateAction.pending" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: false,
      };

      const result = userData.reducer(state, uploadCertificateAction.pending);

      expect(result.isDataUpdating).toBe(true);
    });

    it('should set isDataUpdating to "false" with "uploadCertificateAction.rejected" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: true,
      };

      const result = userData.reducer(state, uploadCertificateAction.rejected);

      expect(result.isDataUpdating).toBe(false);
    });

    it('should set isDataUpdating to "false" with "uploadCertificateAction.fulfilled" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: true,
      };

      const result = userData.reducer(state, uploadCertificateAction.fulfilled);

      expect(result.isDataUpdating).toBe(false);
    });

    it('should add certificate with "uploadCertificateAction.fulfilled" action', () => {
      const actionPayload = makeFakeFileData();
      const state: UserData = {
        ...initialState,
        certificates: [],
      };
      const expectedResult = {
        ...state,
        certificates: [actionPayload],
      };

      const result = userData.reducer(
        state,
        uploadCertificateAction.fulfilled(actionPayload, '', new File([], '')),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataUpdating to "true" with "deleteCertificateAction.pending" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: false,
      };

      const result = userData.reducer(state, deleteCertificateAction.pending);

      expect(result.isDataUpdating).toBe(true);
    });

    it('should set isDataUpdating to "false" with "deleteCertificateAction.rejected" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: true,
      };

      const result = userData.reducer(state, deleteCertificateAction.rejected);

      expect(result.isDataUpdating).toBe(false);
    });

    it('should add certificate and set isDataUpdating to "false" with "deleteCertificateAction.fulfilled" action', () => {
      const certificate = makeFakeFileData();
      const state: UserData = {
        ...initialState,
        certificates: [certificate],
        isDataUpdating: true,
      };
      const expectedResult = {
        ...state,
        certificates: [],
        isDataUpdating: false,
      };

      const result = userData.reducer(
        state,
        deleteCertificateAction.fulfilled(certificate.id, '', certificate.id),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should set isDataUpdating to "true" with "updateCertificateAction.pending" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: false,
      };

      const result = userData.reducer(state, updateCertificateAction.pending);

      expect(result.isDataUpdating).toBe(true);
    });

    it('should set isDataUpdating to "false" with "updateCertificateAction.rejected" action', () => {
      const state: UserData = {
        ...initialState,
        isDataUpdating: true,
      };

      const result = userData.reducer(state, updateCertificateAction.rejected);

      expect(result.isDataUpdating).toBe(false);
    });

    it('should add certificate and set isDataUpdating to "false" with "updateCertificateAction.fulfilled" action', () => {
      const oldCertificate = makeFakeFileData();
      const newCertificate = {
        ...makeFakeFileData(),
        id: oldCertificate.id,
      };
      const state: UserData = {
        ...initialState,
        certificates: [oldCertificate],
        isDataUpdating: true,
      };
      const expectedResult = {
        ...state,
        certificates: [newCertificate],
        isDataUpdating: false,
      };

      const result = userData.reducer(
        state,
        updateCertificateAction.fulfilled(
          { oldCertificateId: oldCertificate.id, newCertificate },
          '',
          { certificateId: '', newCertificate: new File([], '') },
        ),
      );

      expect(result).toEqual(expectedResult);
    });
  });
});
