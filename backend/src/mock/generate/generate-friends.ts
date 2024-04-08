import { getRandomItems } from '@app/helpers';
import { GeneratedDataAmount } from '../mock.const';
import { FriendsEntity } from 'src/friends/friends.entity';

function generateFriendsEntity(userId: string, otherUsersIds): FriendsEntity {
  return FriendsEntity.fromObject({
    userId,
    friendsList: getRandomItems(otherUsersIds, GeneratedDataAmount.Friends),
  });
}

export function generateFriendsEntities(
  allUsersIds: string[],
): FriendsEntity[] {
  return allUsersIds.map((userId) =>
    generateFriendsEntity(
      userId,
      allUsersIds.filter((id) => id !== userId),
    ),
  );
}
