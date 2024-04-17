import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserForm } from '../../types';
import { EmptyUserForm, NameSpace } from '../../const';
import { loginAction } from '../api-actions';

const initialState: UserForm = {
  email: EmptyUserForm.Email,
  password: EmptyUserForm.Password,
  isSending: false,
};

export const userForm = createSlice({
  name: NameSpace.UserForm,
  initialState,
  reducers: {
    resetUserForm: (state) => {
      state.email = EmptyUserForm.Email;
      state.password = EmptyUserForm.Password;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
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
      });
  },
});

export const { resetUserForm, setEmail, setPassword } = userForm.actions;
