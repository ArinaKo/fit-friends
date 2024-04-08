import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '@app/helpers';
import { GeneratedDataAmount } from '../mock.const';
import { SubscriberEntity } from 'src/subscriber/subscriber.entity';
import { WorkoutNotification, WorkoutType } from '@app/types';
import {
  FemaleNames,
  MaleNames,
  WorkoutsDescriptions,
  WorkoutsTitles,
} from './mock-data';
import { CaloriesValue } from 'src/shared/const';

function generateNotifications(): WorkoutNotification[] {
  return Array.from({ length: GeneratedDataAmount.WorkoutNotifications }).map(
    () => ({
      coachName: getRandomItem(FemaleNames.concat(MaleNames)),
      title: getRandomItem(WorkoutsTitles),
      type: getRandomItem(Object.values(WorkoutType)),
      calories: generateRandomValue(CaloriesValue.Min, CaloriesValue.Max),
      description: getRandomItem(WorkoutsDescriptions),
    }),
  );
}

function generateSubscriberEntity(
  userId: string,
  coachesIds: string[],
): SubscriberEntity {
  return SubscriberEntity.fromObject({
    userId,
    notifications: generateNotifications(),
    coaches: getRandomItems(coachesIds, GeneratedDataAmount.Subscriptions),
  });
}

export function generateSubscribersEntities(
  usersIds: string[],
  coachesIds: string[],
): SubscriberEntity[] {
  return usersIds.map((userId) => generateSubscriberEntity(userId, coachesIds));
}
