import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { FriendsEntity } from './friends.entity';
import { FriendsModel } from './friends.model';
import { BaseQuery } from 'src/shared/query/base.query';
import { UserEntity } from 'src/user/user.entity';
import {
  DEFAULT_PAGE,
  DEFAULT_REQUEST_STATUS,
  DEFAULT_SORT_DIRECTION,
  LIST_LIMIT,
} from 'src/shared/const';
import { WorkoutRequestEntity } from 'src/workout-request/workout-request.entity';

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
        { $push: { friendsList: friendId } },
        { new: true, upsert: true },
      )
      .exec();
  }

  public async deleteFromFriends(userId: string, friendId: string) {
    await this.model
      .findOneAndUpdate(
        { userId },
        { $pull: { friendsList: friendId } },
        { new: true, upsert: true },
      )
      .exec();
  }

  public async find(
    userId: string,
    query?: BaseQuery,
  ): Promise<
    PaginationResult<{ user: UserEntity; workoutRequest: WorkoutRequestEntity }>
  > {
    const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;

    const record = await this.model
      .aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: 'users',
            let: { friendsList: '$friendsList' },
            pipeline: [
              {
                $addFields: {
                  id: { $toString: '$_id' },
                },
              },
              {
                $match: {
                  $expr: {
                    $in: ['$id', '$$friendsList'],
                  },
                },
              },
              { $sort: { createdAt: sortDirection } },
              { $skip: skip },
              { $limit: limit },
              {
                $lookup: {
                  from: 'workout-requests',
                  let: { userFromId: '$id' },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ['$userFromId', '$$userFromId'] },
                            { $eq: ['$userToId', userId] },
                            { $eq: ['$status', DEFAULT_REQUEST_STATUS] },
                          ],
                        },
                      },
                    },
                    {
                      $addFields: {
                        id: { $toString: '$_id' },
                      },
                    },
                  ],
                  as: 'request',
                },
              },
              {
                $unwind: {
                  path: '$request',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: 'files',
                  let: { imageId: '$avatar' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', { $toObjectId: '$$imageId' }] },
                      },
                    },
                    {
                      $addFields: {
                        id: { $toString: '$_id' },
                      },
                    },
                  ],
                  as: 'avatar',
                },
              },
              { $unwind: '$avatar' },
            ],
            as: 'friends',
          },
        },
      ])
      .exec()
      .then((r) => r.at(0) || null);

    const friendsAmount = record.friendsList.length;

    const records = record.friends.map((friend) => ({
      user: UserEntity.fromObject(friend),
      workoutRequest: friend.request
        ? WorkoutRequestEntity.fromObject(friend.request)
        : undefined,
    }));

    return {
      entities: records,
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: this.calculatePages(friendsAmount, limit),
      itemsPerPage: limit,
      totalItems: friendsAmount,
    };
  }
}
