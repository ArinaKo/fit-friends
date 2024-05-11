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
      .addCase(getAllWorkoutsAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      })
      .addCase(getCoachWorkoutsAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      })
      .addCase(getCoachOrdersAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      })
      .addCase(getUserBalancesAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      })
      .addCase(getUserFriendsAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        const { itemsPerPage, totalItems, totalPages } = action.payload;
        state.itemsPerPage = itemsPerPage;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
      });
  },
});

export const { resetCatalogData, resetCatalogPage, increaseCatalogPage } =
  catalogData.actions;
