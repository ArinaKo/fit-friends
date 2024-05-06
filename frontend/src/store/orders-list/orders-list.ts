import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrdersList } from '../../types';
import { NameSpace, OrdersSortType } from '../../const';
import { getCoachOrdersAction } from '../api-actions';

const initialState: OrdersList = {
  orders: [],
  isDataLoading: false,
  sorting: {
    type: OrdersSortType.Count,
    directionDown: true,
  },
};

export const ordersList = createSlice({
  name: NameSpace.OrdersList,
  initialState,
  reducers: {
    resetOrdersSorting: (state) => {
      state.sorting = initialState.sorting;
    },
    setOrdersSorting: (state, action: PayloadAction<OrdersSortType>) => {
      if (state.sorting.type === action.payload) {
        state.sorting.directionDown = !state.sorting.directionDown;
        return;
      }
      state.sorting.type = action.payload;
      state.sorting.directionDown = initialState.sorting.directionDown;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCoachOrdersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getCoachOrdersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getCoachOrdersAction.fulfilled, (state, action) => {
        const { orders, currentPage } = action.payload;
        state.orders =
          currentPage === 1 ? orders : [...state.orders, ...orders];
        state.isDataLoading = false;
      });
  },
});

export const { resetOrdersSorting, setOrdersSorting } = ordersList.actions;
