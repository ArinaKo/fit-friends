import { ConflictException, Injectable } from '@nestjs/common';
import { FriendsEntity } from './friends.entity';
import { FriendsRepository } from './friends.repository';
import { UpdateFriendsDto } from './dto';
import { UserService } from 'src/user/user.service';
import { UserRole } from '@app/types';
import { BaseQuery } from 'src/query/base.query';
import { UserRepository } from 'src/user/user.repository';
import { UserRdo, UsersWithPaginationRdo } from 'src/user/rdo';
import { fillDto } from '@app/helpers';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  private async checkUserInFriends(
    userId: string,
    friendId: string,
  ): Promise<boolean> {
    const friendsRecord = await this.getFriendsEntity(userId);
    return friendsRecord?.friendsList.includes(friendId);
  }

  private async getFriendsEntity(userId: string): Promise<FriendsEntity> {
    const existedRecord = await this.friendsRepository.findByUserId(userId);
    if (existedRecord) {
      return existedRecord;
    }

    const friendsEntity = FriendsEntity.fromObject({ userId, friendsList: [] });
    return this.friendsRepository.save(friendsEntity);
  }

  public async getFriendsList(
    userId: string,
    query?: BaseQuery,
  ): Promise<UsersWithPaginationRdo> {
    let friendsRecord = await this.getFriendsEntity(userId);
    const friendsWithPagination = await this.userRepository.find(
      query,
      friendsRecord.friendsList,
    );
    return fillDto(UsersWithPaginationRdo, {
      ...friendsWithPagination,
      users: friendsWithPagination.entities.map((entity) =>
        fillDto(UserRdo, entity.toPOJO()),
      ),
    });
  }

  public async addFriend(userId: string, { friendId }: UpdateFriendsDto) {
    if (userId === friendId) {
      throw new ConflictException(`You can not add yourself to friends`);
    }

    const newFriend = await this.userService.getUserEntity(friendId);

    if (await this.checkUserInFriends(userId, friendId)) {
      throw new ConflictException(
        `User with id ${friendId} already in friends`,
      );
    }

    await this.friendsRepository.addToFriends(userId, friendId);

    if (newFriend.role === UserRole.Coach) {
      await this.friendsRepository.addToFriends(friendId, userId);
    }
  }

  public async removeFriend(userId: string, { friendId }: UpdateFriendsDto) {
    await this.userService.getUserEntity(friendId);

    if (!(await this.checkUserInFriends(userId, friendId))) {
      throw new ConflictException(`User with id ${friendId} is not in friends`);
    }

    await this.friendsRepository.deleteFromFriends(userId, friendId);
  }
}
