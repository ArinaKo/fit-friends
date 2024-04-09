import { OrderType, PaymentType } from '@app/types';
import { generateDate, generateRandomValue, getRandomItem } from '@app/helpers';
import { OrderCountValue } from 'src/shared/const';
import { GeneratedDataAmount } from '../mock.const';
import { WorkoutEntity } from 'src/workout/workout.entity';
import { OrderEntity } from 'src/order/order.entity';

function generateOrder(workouts: WorkoutEntity[]) {
  const workout = getRandomItem(workouts);
  const count = generateRandomValue(OrderCountValue.Min, OrderCountValue.Max);
  return {
    type: getRandomItem(Object.values(OrderType)),
    workoutId: workout.id!,
    workoutPrice: workout.price,
    count: count,
    totalPrice: count * workout.price,
    paymentType: getRandomItem(Object.values(PaymentType)),
    createdAt: generateDate(),
  };
}

function generateOrdersFromUser(
  userId: string,
  workouts: WorkoutEntity[],
): OrderEntity[] {
  return Array.from({ length: GeneratedDataAmount.Orders }).map(() =>
    OrderEntity.fromObject(Object.assign(generateOrder(workouts), { userId })),
  );
}

export function generateOrdersEntities(
  usersIds: string[],
  workouts: WorkoutEntity[],
): OrderEntity[] {
  return usersIds
    .map((userId) => generateOrdersFromUser(userId, workouts))
    .flat();
}
