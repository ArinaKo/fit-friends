import { createSlice } from '@reduxjs/toolkit';
import { UsersList } from '../../types';
import { NameSpace } from '../../const';
import {
  getUserFriendsAction,
  updateWorkoutRequestAction,
} from '../api-actions';

const initialState: UsersList = {
  users: [],
  isDataLoading: false,
};

export const usersList = createSlice({
  name: NameSpace.UsersList,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserFriendsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getUserFriendsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getUserFriendsAction.fulfilled, (state, action) => {
        const { friends, currentPage } = action.payload;
        state.users =
          currentPage === 1 ? friends : [...state.users, ...friends];
        state.isDataLoading = false;
      })
      .addCase(updateWorkoutRequestAction.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.users = state.users.map((user) => {
          if (user.workoutRequest?.id === id) {
            user.workoutRequest.status = status;
          }
          return user;
        });
      });
  },
});
