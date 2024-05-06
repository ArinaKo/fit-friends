import { createSlice } from '@reduxjs/toolkit';
import { FriendsList } from '../../types';
import { NameSpace } from '../../const';
import {
  getUserFriendsAction,
  updateWorkoutRequestAction,
} from '../api-actions';

const initialState: FriendsList = {
  friends: [],
  isDataLoading: false,
};

export const friendsList = createSlice({
  name: NameSpace.FriendsList,
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
        state.friends =
          currentPage === 1 ? friends : [...state.friends, ...friends];
        state.isDataLoading = false;
      })
      .addCase(updateWorkoutRequestAction.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.friends = state.friends.map((friend) => {
          if (friend.workoutRequest?.id === id) {
            friend.workoutRequest.status = status;
          }
          return friend;
        });
      });
  },
});
