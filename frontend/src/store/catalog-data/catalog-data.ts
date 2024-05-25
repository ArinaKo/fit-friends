import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CatalogData } from '../../types';
import { ListItemsPortion, NameSpace } from '../../const';
import {
  getAllUsersAction,
  getAllWorkoutsAction,
  getCoachOrdersAction,
  getCoachWorkoutsAction,
  getUserBalancesAction,
  getUserFriendsAction,
} from '../api-actions';

const initialState: CatalogData = {
  limit: ListItemsPortion.Default,
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  itemsPerPage: 0,
  isDataLoading: false,
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {
    resetCatalogData: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.itemsPerPage = initialState.itemsPerPage;
      state.totalPages = initialState.totalPages;
      state.totalItems = initialState.totalItems;
      state.currentPage = initialState.currentPage;
    },
    resetCatalogPage: (state) => {
      state.currentPage = initialState.currentPage;
    },
    increaseCatalogPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllWorkoutsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getCoachWorkoutsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getCoachOrdersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getUserBalancesAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getUserFriendsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getAllUsersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getAllWorkoutsAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isDataLoading = false;
      })
      .addCase(getCoachWorkoutsAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isDataLoading = false;
      })
      .addCase(getCoachOrdersAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isDataLoading = false;
      })
      .addCase(getUserBalancesAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isDataLoading = false;
      })
      .addCase(getUserFriendsAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isDataLoading = false;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isDataLoading = false;
      })
      .addCase(getAllWorkoutsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getCoachWorkoutsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getCoachOrdersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getUserBalancesAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getUserFriendsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getAllUsersAction.rejected, (state) => {
        state.isDataLoading = false;
      });
  },
});

export const { resetCatalogData, resetCatalogPage, increaseCatalogPage } =
  catalogData.actions;
