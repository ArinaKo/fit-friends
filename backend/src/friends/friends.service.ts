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

  public async createFriends(userId: string) {
    const friendsEntity = FriendsEntity.fromObject({ userId, friendsList: [] });
    await this.friendsRepository.save(friendsEntity);
  }

  public async addFriend(userId: string, { friendId }: UpdateFriendsDto) {
    if (userId === friendId) {
      throw new ConflictException(`You can not add yourself to friends`);
    }

    const newFriend = await this.userService.getUserById(friendId);

    const friendsRecord = await this.friendsRepository.findByUserId(userId);

    if (
      friendsRecord?.friendsList.map((friend) => friend.id).includes(friendId)
    ) {
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

    const friendsRecord = await this.friendsRepository.findByUserId(userId);

    if (
      !friendsRecord?.friendsList.map((friend) => friend.id).includes(friendId)
    ) {
      throw new ConflictException(
        `User with id ${friendId} is not in friends`,
      );
    }

    await this.friendsRepository.deleteFromFriends(userId, friendId);
  }
}
