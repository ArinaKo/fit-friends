import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UsersList } from '../../types';
import { NameSpace, UserLevel } from '../../const';
import {
  getAllUsersAction,
  getUserFriendsAction,
  updateWorkoutRequestAction,
} from '../api-actions';

const initialState: UsersList = {
  users: [],
  filter: {
    locations: [],
    types: [],
    level: UserLevel.Beginner,
    role: undefined,
  },
  isDataLoading: false,
};

export const usersList = createSlice({
  name: NameSpace.UsersList,
  initialState,
  reducers: {
    resetUsersFilters: (state) => {
      state.filter = initialState.filter;
    },
    setUsersLocationsFilter: (state, action: PayloadAction<string>) => {
      const location = action.payload;
      state.filter.locations = state.filter.locations.includes(location)
        ? state.filter.locations.filter((item) => item !== location)
        : [...state.filter.locations, location];
    },
    setUsersTypesFilter: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      state.filter.types = state.filter.types.includes(type)
        ? state.filter.types.filter((item) => item !== type)
        : [...state.filter.types, type];
    },
    setUsersLevelFilter: (state, action: PayloadAction<string>) => {
      state.filter.level = action.payload;
    },
    setUsersRoleFilter: (
      state,
      action: PayloadAction<string>,
    ) => {
      const value = action.payload;
      state.filter.role = state.filter.role !== value ? value : undefined;
    },
  },
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
      })
      .addCase(getAllUsersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getAllUsersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        const { users, currentPage } = action.payload;
        state.users = currentPage === 1 ? users : [...state.users, ...users];
        state.isDataLoading = false;
      });
  },
});

export const {
  resetUsersFilters,
  setUsersLocationsFilter,
  setUsersTypesFilter,
  setUsersLevelFilter,
  setUsersRoleFilter,
} = usersList.actions;
