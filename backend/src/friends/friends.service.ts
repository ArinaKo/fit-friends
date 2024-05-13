import { ConflictException, Injectable } from '@nestjs/common';
import { FriendsEntity } from './friends.entity';
import { FriendsRepository } from './friends.repository';
import { UpdateFriendsDto } from './dto';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from '@app/types';
import { BaseQuery } from 'src/shared/query/base.query';
import { fillDto } from '@app/helpers';
import {
  FriendRdo,
  FriendshipStatusRdo,
  FriendsWithPaginationRdo,
} from './rdo';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationText } from 'src/notification/notification.const';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  private async getFriendsEntity(userId: string): Promise<FriendsEntity> {
    const existedRecord = await this.friendsRepository.findByUserId(userId);
    if (existedRecord) {
      return existedRecord;
    }

    const friendsEntity = FriendsEntity.fromObject({ userId, friendsList: [] });
    return this.friendsRepository.save(friendsEntity);
  }

  private async checkUserInFriends(
    userId: string,
    friendId: string,
  ): Promise<boolean> {
    const friendsRecord = await this.getFriendsEntity(userId);
    return friendsRecord.friendsList.includes(friendId);
  }

  public async getFriendshipStatus(
    userId: string,
    friendId: string,
  ): Promise<FriendshipStatusRdo> {
    const friendsRecord = await this.getFriendsEntity(userId);
    return {
      isFriend: friendsRecord.friendsList.includes(friendId),
    };
  }

  public async getFriendsList(
    userId: string,
    query?: BaseQuery,
  ): Promise<FriendsWithPaginationRdo> {
    await this.getFriendsEntity(userId);
    const friendsWithPagination = await this.friendsRepository.find(
      userId,
      query,
    );
    return fillDto(FriendsWithPaginationRdo, {
      ...friendsWithPagination,
      friends: friendsWithPagination.entities.map(({ user, workoutRequest }) =>
        fillDto(FriendRdo, {
          ...user.toPOJO(),
          workoutRequest: workoutRequest ? workoutRequest.toPOJO() : undefined,
        }),
      ),
    });
  }

  public async addFriend(
    tokenPayload: TokenPayload,
    { friendId }: UpdateFriendsDto,
  ) {
    const { sub: userId, name: userName } = tokenPayload;

    if (userId === friendId) {
      throw new ConflictException(`You can not add yourself to friends`);
    }

    await this.userService.getUserEntity(friendId);

    if (await this.checkUserInFriends(userId, friendId)) {
      throw new ConflictException(
        `User with id ${friendId} already in friends`,
      );
    }

    await this.friendsRepository.addToFriends(userId, friendId);

    if (!(await this.checkUserInFriends(friendId, userId))) {
      await this.friendsRepository.addToFriends(friendId, userId);
    }

    await this.notificationService.createNotification(
      friendId,
      NotificationText.getNewFriendMessage(userName),
    );
  }

  public async removeFriend(userId: string, { friendId }: UpdateFriendsDto) {
    await this.userService.getUserEntity(friendId);

    if (!(await this.checkUserInFriends(userId, friendId))) {
      throw new ConflictException(`User with id ${friendId} is not in friends`);
    }

    await this.friendsRepository.deleteFromFriends(userId, friendId);
  }
}
