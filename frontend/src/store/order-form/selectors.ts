import { NameSpace, PaymentType } from '../../const';
import { State } from '../../types';

export const getOrderCount = (state: State): number =>
  state[NameSpace.OrderForm].count;

export const getOrderSum = (state: State): number =>
  state[NameSpace.OrderForm].totalSum;

export const getOrderPaymentType = (state: State): PaymentType =>
  state[NameSpace.OrderForm].paymentType;

export const isOrderSending = (state: State): boolean =>
  state[NameSpace.OrderForm].isSending;
