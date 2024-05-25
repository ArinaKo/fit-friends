import { NameSpace, PaymentType } from '../../const';
import { State } from '../../types';

export const getOrderCount = (
  state: Pick<State, NameSpace.OrderForm>,
): number => state[NameSpace.OrderForm].count;

export const getOrderSum = (state: Pick<State, NameSpace.OrderForm>): number =>
  state[NameSpace.OrderForm].totalSum;

export const getOrderPaymentType = (
  state: Pick<State, NameSpace.OrderForm>,
): PaymentType => state[NameSpace.OrderForm].paymentType;

export const isOrderSending = (
  state: Pick<State, NameSpace.OrderForm>,
): boolean => state[NameSpace.OrderForm].isSending;
