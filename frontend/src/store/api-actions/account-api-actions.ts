import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUser, FileData, UserFiles } from '../../types';
import { APIRoute } from '../../const';
import { getUpdateUserData, getUpdateUserDataWithAvatar } from '../../utils';
import { AsyncThunkConfig } from './async-thunk-config';

export const getAuthUserAction = createAsyncThunk<
  AuthUser,
  undefined,
  AsyncThunkConfig
>('account/user-data', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthUser>(APIRoute.AuthUser);
  return data;
});

export const updateUserAction = createAsyncThunk<
  AuthUser,
  UserFiles,
  AsyncThunkConfig
>('account/update', async (files, { getState, extra: api }) => {
  const formData = files.avatar
    ? getUpdateUserDataWithAvatar(getState(), files.avatar)
    : getUpdateUserData(getState());
  const { data } = await api.patch<AuthUser>(APIRoute.UpdateUser, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
});

export const deleteCertificateAction = createAsyncThunk<
  string,
  string,
  AsyncThunkConfig
>('account/delete-certificate', async (certificateId, { extra: api }) => {
  await api.patch<FileData[]>(APIRoute.DeleteCertificate, { certificateId });
  return certificateId;
});

export const updateCertificateAction = createAsyncThunk<
  { oldCertificateId: string; newCertificate: FileData },
  { certificateId: string; newCertificate: Blob },
  AsyncThunkConfig
>(
  'account/update-certificate',
  async ({ certificateId, newCertificate }, { extra: api }) => {
    const formData = new FormData();
    formData.append('oldCertificateId', certificateId);
    formData.append('newCertificate', newCertificate);
    const { data } = await api.patch<FileData>(
      APIRoute.UpdateCertificate,
      formData,
    );
    return { oldCertificateId: certificateId, newCertificate: data };
  },
);

export const uploadCertificateAction = createAsyncThunk<
  FileData,
  File,
  AsyncThunkConfig
>('account/upload-certificate', async (certificate, { extra: api }) => {
  const fileData = new FormData();
  fileData.append('certificate', certificate);
  const { data } = await api.patch<FileData>(
    APIRoute.UploadCertificate,
    fileData,
  );
  return data;
});
