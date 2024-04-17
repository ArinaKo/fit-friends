import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserForm } from '../../types';
import {
  EmptyUserForm,
  MetroStation,
  NameSpace,
  UserRole,
  UserSex,
} from '../../const';
import { loginAction, registerAction } from '../api-actions';

const initialState: UserForm = {
  email: EmptyUserForm.Email,
  password: EmptyUserForm.Password,
  name: EmptyUserForm.Name,
  sex: EmptyUserForm.Sex,
  dateOfBirth: EmptyUserForm.DateOfBirth,
  role: EmptyUserForm.Role,
  location: EmptyUserForm.Location,
  isSending: false,
};

export const userForm = createSlice({
  name: NameSpace.UserForm,
  initialState,
  reducers: {
    resetUserForm: (state) => {
      state.email = EmptyUserForm.Email;
      state.password = EmptyUserForm.Password;
      state.name = EmptyUserForm.Name;
      state.sex = EmptyUserForm.Sex;
      state.dateOfBirth = EmptyUserForm.DateOfBirth;
      state.role = EmptyUserForm.Role;
      state.location = EmptyUserForm.Location;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSex: (state, action: PayloadAction<UserSex>) => {
      state.sex = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setLocation: (state, action: PayloadAction<MetroStation>) => {
      state.location = action.payload;
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.email = EmptyUserForm.Email;
        state.password = EmptyUserForm.Password;
        state.isSending = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(registerAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.email = EmptyUserForm.Email;
        state.password = EmptyUserForm.Password;
        state.name = EmptyUserForm.Name;
        state.sex = EmptyUserForm.Sex;
        state.dateOfBirth = EmptyUserForm.DateOfBirth;
        state.role = EmptyUserForm.Role;
        state.location = EmptyUserForm.Location;
        state.isSending = false;
      })
      .addCase(registerAction.rejected, (state) => {
        state.isSending = false;
      });
  },
});

export const {
  resetUserForm,
  setEmail,
  setPassword,
  setDateOfBirth,
  setLocation,
  setName,
  setRole,
  setSex,
} = userForm.actions;
