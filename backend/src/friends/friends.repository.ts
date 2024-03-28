import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { FriendsEntity } from './friends.entity';
import { FriendsModel } from './friends.model';

@Injectable()
export class FriendsRepository extends BaseMongoRepository<
  FriendsEntity,
  FriendsModel
> {
  constructor(
    @InjectModel(FriendsModel.name) FriendsModel: Model<FriendsModel>,
  ) {
    super(FriendsModel, FriendsEntity.fromObject);
  }

  public async findByUserId(userId: string): Promise<FriendsEntity | null> {
    const document = await this.model.findOne({ userId }).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async addToFriends(userId: string, friendId: string) {
    await this.model
      .findOneAndUpdate(
        { userId },
        { $push: { friendList: friendId } },
        { new: true, upsert: true },
      )
      .exec();
  }
}
