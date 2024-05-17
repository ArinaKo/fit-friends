import { State } from '../types';

export function getOrderData(state: State) {
  const { type, count, paymentType, workoutId } = state.ORDER_FORM;
  return {
    type,
    count,
    paymentType,
    workoutId,
  };
}
