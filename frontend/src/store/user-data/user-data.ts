import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types';
import { MetroStation, NameSpace, UserLevel, UserSex } from '../../const';
import {
  deleteCertificateAction,
  getAuthUserAction,
  updateCertificateAction,
  updateUserAction,
  uploadCertificateAction,
} from '../api-actions';

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
};

export const userData = createSlice({
  name: NameSpace.UserData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthUserAction.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.location = action.payload.location;
        state.avatar = action.payload.avatar;
        state.level = action.payload.level;
        state.sex = action.payload.sex;
        state.isReady = action.payload.isReady;
        state.description = action.payload.description;
        state.workoutTypes = action.payload.workoutTypes;
        if (action.payload.caloriesToLose) {
          state.caloriesToLose = action.payload.caloriesToLose;
        }
        if (action.payload.caloriesPerDay) {
          state.caloriesPerDay = action.payload.caloriesPerDay;
        }
        if (action.payload.certificates) {
          state.certificates = action.payload.certificates;
        }
        state.isDataReady = true;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.isDataUpdating = true;
      })
      .addCase(updateUserAction.rejected, (state) => {
        state.isDataUpdating = false;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.location = action.payload.location;
        state.level = action.payload.level;
        state.sex = action.payload.sex;
        state.isReady = action.payload.isReady;
        state.description = action.payload.description;
        state.workoutTypes = action.payload.workoutTypes;
        state.avatar = action.payload.avatar;
        state.isDataUpdating = false;
      })
      .addCase(uploadCertificateAction.pending, (state) => {
        state.isDataUpdating = true;
      })
      .addCase(uploadCertificateAction.rejected, (state) => {
        state.isDataUpdating = false;
      })
      .addCase(uploadCertificateAction.fulfilled, (state, action) => {
        state.certificates = [action.payload, ...state.certificates];
        state.isDataUpdating = false;
      })
      .addCase(deleteCertificateAction.pending, (state) => {
        state.isDataUpdating = true;
      })
      .addCase(deleteCertificateAction.rejected, (state) => {
        state.isDataUpdating = false;
      })
      .addCase(deleteCertificateAction.fulfilled, (state, action) => {
        state.certificates = state.certificates.filter(
          (certificate) => certificate.id !== action.payload,
        );
        state.isDataUpdating = false;
      })
      .addCase(updateCertificateAction.pending, (state) => {
        state.isDataUpdating = true;
      })
      .addCase(updateCertificateAction.rejected, (state) => {
        state.isDataUpdating = false;
      })
      .addCase(updateCertificateAction.fulfilled, (state, action) => {
        const { oldCertificateId, newCertificate } = action.payload;
        state.certificates = state.certificates.map((certificate) =>
          certificate.id !== oldCertificateId ? certificate : newCertificate,
        );
        state.isDataUpdating = false;
      });
  },
});
