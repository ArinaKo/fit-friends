import { NameSpace, OrderType, PaymentType } from '../../const';
import { OrderForm } from '../../types';
import {
  getOrderCount,
  getOrderPaymentType,
  getOrderSum,
  isOrderSending,
} from './selectors';

describe('OrderForm selectors', () => {
  const state: OrderForm = {
    workoutId: '',
    price: 1,
    type: OrderType.Default,
    count: 3,
    totalSum: 4500,
    paymentType: PaymentType.Visa,
    isSending: false,
  };

  it('should return count value', () => {
    const { count } = state;

    const result = getOrderCount({ [NameSpace.OrderForm]: state });

    expect(result).toBe(count);
  });

  it('should return sum value', () => {
    const { totalSum } = state;

    const result = getOrderSum({ [NameSpace.OrderForm]: state });

    expect(result).toBe(totalSum);
  });

  it('should return payment type value', () => {
    const { paymentType } = state;

    const result = getOrderPaymentType({ [NameSpace.OrderForm]: state });

    expect(result).toBe(paymentType);
  });

  it('should return form sending status', () => {
    const { isSending } = state;

    const result = isOrderSending({ [NameSpace.OrderForm]: state });

    expect(result).toBe(isSending);
  });
});
