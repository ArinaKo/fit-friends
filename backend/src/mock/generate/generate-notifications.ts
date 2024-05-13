import { generateRandomValue, getRandomItem } from '@app/helpers';
import { FemaleNames, MaleNames } from './mock-data';
import { GeneratedDataAmount } from '../mock.const';
import { NotificationEntity } from 'src/notification/notification.entity';
import { NotificationText } from 'src/notification/notification.const';

function generateNotification(userId: string) {
  return {
    userId,
    text: NotificationText.getNewFriendMessage(
      getRandomItem(FemaleNames.concat(MaleNames)),
    ),
  };
}

function generateNotificationForUser(userId: string): NotificationEntity[] {
  const amount = generateRandomValue(0, GeneratedDataAmount.Notifications);
  return Array.from({ length: amount }).map(() =>
    NotificationEntity.fromObject(generateNotification(userId)),
  );
}

export function generateNotificationsEntities(
  allUsersIds: string[],
): NotificationEntity[] {
  return allUsersIds
    .map((userId) => generateNotificationForUser(userId))
    .flat();
}
