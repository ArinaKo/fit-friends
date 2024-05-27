import { OrderType, PaymentType } from '../../const';
import { OrderForm } from '../../types';
import { createOrderAction } from '../api-actions';
import {
  decreaseCount,
  increaseCount,
  orderForm,
  setOrderForm,
  setPaymentType,
} from './order-form';

describe('OrderForm Slice', () => {
  const initialState: OrderForm = {
    workoutId: '',
    price: 0,
    type: OrderType.Default,
    count: 1,
    totalSum: 0,
    paymentType: PaymentType.Visa,
    isSending: false,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = orderForm.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = orderForm.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should set workoutId, price, total sum and reset other data with "setOrderForm" action', () => {
      const actionPayload = {
        workoutId: 'workout-id',
        price: 300,
      };
      const expectedResult: OrderForm = {
        ...initialState,
        workoutId: actionPayload.workoutId,
        price: actionPayload.price,
        totalSum: actionPayload.price,
      };

      const result = orderForm.reducer(
        initialState,
        setOrderForm(actionPayload),
      );

      expect(result).toEqual(expectedResult);
    });

    it('should increase count and total sum with "increaseCount" action', () => {
      const state: OrderForm = {
        ...initialState,
        count: 2,
        price: 100,
        totalSum: 200,
      };
      const expectedResult: OrderForm = {
        ...state,
        count: state.count + 1,
        totalSum: state.price * (state.count + 1),
      };

      const result = orderForm.reducer(state, increaseCount());

      expect(result).toEqual(expectedResult);
    });

    it('should decrease count and total sum with "decreaseCount" action', () => {
      const state: OrderForm = {
        ...initialState,
        count: 2,
        price: 100,
        totalSum: 200,
      };
      const expectedResult: OrderForm = {
        ...state,
        count: state.count - 1,
        totalSum: state.price * (state.count - 1),
      };

      const result = orderForm.reducer(state, decreaseCount());

      expect(result).toEqual(expectedResult);
    });

    it('should set payment type with "setPaymentType" action', () => {
      const expectedResult = PaymentType.Umoney;

      const result = orderForm.reducer(
        initialState,
        setPaymentType(expectedResult),
      );

      expect(result.paymentType).toBe(expectedResult);
    });
  });

  describe('Api-actions check', () => {
    it('should set isSending to "true" with "createOrderAction.pending" action', () => {
      const state: OrderForm = {
        ...initialState,
        isSending: false,
      };

      const result = orderForm.reducer(state, createOrderAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should reset data to initial sate with "createOrderAction.fulfilled" action', () => {
      const state: OrderForm = {
        ...initialState,
        workoutId: 'id',
        price: 100,
        count: 5,
        totalSum: 500,
        paymentType: PaymentType.Umoney,
        isSending: true,
      };

      const result = orderForm.reducer(state, createOrderAction.fulfilled);

      expect(result).toEqual(initialState);
    });

    it('should set isSending to "false" with "createOrderAction.rejected" action', () => {
      const state: OrderForm = {
        ...initialState,
        isSending: true,
      };

      const result = orderForm.reducer(state, createOrderAction.rejected);

      expect(result.isSending).toBe(false);
    });
  });
});
