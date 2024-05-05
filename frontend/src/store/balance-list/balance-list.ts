import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BalancesList } from '../../types';
import { NameSpace } from '../../const';
import { getUserBalancesAction } from '../api-actions';

const initialState: BalancesList = {
  balances: [],
  isDataLoading: false,
  isOnlyActive: false,
};

export const balancesList = createSlice({
  name: NameSpace.BalancesList,
  initialState,
  reducers: {
    setBalancesSorting: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload === undefined) {
        state.isOnlyActive = initialState.isOnlyActive;
        return;
      }
      state.isOnlyActive = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserBalancesAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getUserBalancesAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getUserBalancesAction.fulfilled, (state, action) => {
        const { balances, currentPage } = action.payload;
        state.balances =
          currentPage === 1 ? balances : [...state.balances, ...balances];
        state.isDataLoading = true;
      });
  },
});

export const { setBalancesSorting } = balancesList.actions;
