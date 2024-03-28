import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { FriendsEntity } from './friends.entity';
import { FriendsRepository } from './friends.repository';
import { UpdateFriendsDto } from './dto';
import { UserService } from 'src/user/user.service';
import { UserRole } from '@app/types';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly userService: UserService,
  ) {}

  private async checkUserInFriends(
    userId: string,
    friendId: string,
  ): Promise<boolean> {
    const friendsRecord = await this.getFriendsRecord(userId);
    return friendsRecord?.friendsList.includes(friendId);
  }

  private async getFriendsRecord(userId: string): Promise<FriendsEntity> {
    const existedRecord = await this.friendsRepository.findByUserId(userId);
    if (existedRecord) {
      return existedRecord;
    }

    const friendsEntity = FriendsEntity.fromObject({ userId, friendsList: [] });
    return this.friendsRepository.save(friendsEntity);
  }

  public async addFriend(userId: string, { friendId }: UpdateFriendsDto) {
    if (userId === friendId) {
      throw new ConflictException(`You can not add yourself to friends`);
    }

    const newFriend = await this.userService.getUserById(friendId);

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
    await this.userService.getUserById(friendId);

    if (!(await this.checkUserInFriends(userId, friendId))) {
      throw new ConflictException(`User with id ${friendId} is not in friends`);
    }

    await this.friendsRepository.deleteFromFriends(userId, friendId);
  }
}
