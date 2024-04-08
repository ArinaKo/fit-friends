import { getRandomItem } from '@app/helpers';
import { FemaleNames, MaleNames } from './mock-data';
import { GeneratedDataAmount } from '../mock.const';
import { NotificationEntity } from 'src/notification/notification.entity';
import { NotificationText } from 'src/notification/notification.const';

function generateNotificationEntity(usersIds: string[]): NotificationEntity {
  return NotificationEntity.fromObject({
    userId: getRandomItem(usersIds),
    text: NotificationText.getNewFriendMessage(
      getRandomItem(FemaleNames.concat(MaleNames)),
    ),
  });
}

export function generateNotificationsEntities(
  allUsersIds: string[],
): NotificationEntity[] {
  return Array.from({ length: GeneratedDataAmount.Notifications }).map(() =>
    generateNotificationEntity(allUsersIds),
  );
}
