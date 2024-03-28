import { Injectable } from '@nestjs/common';
import { FriendsEntity } from './friends.entity';
import { FriendsRepository } from './friends.repository';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  public async createFriends(userId: string) {
    const friendsEntity = FriendsEntity.fromObject({ userId, friendsList: [] });
    await this.friendsRepository.save(friendsEntity);
  }
}
