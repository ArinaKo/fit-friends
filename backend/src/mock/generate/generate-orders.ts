import {
  OrderType,
  PaymentType,
} from '@app/types';
import { generateDate, generateRandomValue, getRandomItem } from '@app/helpers';
import { OrderCountValue } from 'src/shared/const';

const ORDERS_NUMBER = 5;

function generateOrder(workouts: { id: string; price: number }[]) {
  const workout = getRandomItem(workouts);
  let order = {
    type: getRandomItem(Object.values(OrderType)),
    workoutId: workout.id,
    workoutPrice: workout.price,
    count: generateRandomValue(OrderCountValue.Min, OrderCountValue.Max),
    totalPrice: 0,
    paymentType: getRandomItem(Object.values(PaymentType)),
    createdAt: generateDate(),
  };
  order.totalPrice = order.count * order.workoutPrice;
  return order;
}

export function generatesOrders(
  userId: string,
  workouts: { id: string; price: number }[],
) {
  return Array.from({ length: ORDERS_NUMBER }).forEach(() =>
    Object.assign(generateOrder(workouts), { userId }),
  );
}
