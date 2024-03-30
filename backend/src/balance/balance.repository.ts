import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { BalanceEntity } from './balance.entity';
import { BalanceModel } from './balance.model';
import { WorkoutBalanceEntity } from './workout-balance.entity';
import { UserBalanceQuery } from './query';
import { DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/const';

@Injectable()
export class BalanceRepository extends BaseMongoRepository<
  BalanceEntity,
  BalanceModel
> {
  constructor(
    @InjectModel(BalanceModel.name) BalanceModel: Model<BalanceModel>,
  ) {
    super(BalanceModel, BalanceEntity.fromObject);
  }

  public async findBalance(
    userId: string,
    workoutId: string,
  ): Promise<BalanceEntity | null> {
    const document = await this.model.findOne({ userId, workoutId }).exec();

    if (!document) {
      return null;
    }

    document.id = document._id.toString();
    return this.createEntityFromDocument(document);
  }

  public async find(
    userId: string,
    query?: UserBalanceQuery,
  ): Promise<PaginationResult<WorkoutBalanceEntity>> {
    const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;
    let filter = query?.active ? { userId, count: { $ne: 0 } } : { userId };

    const [records, recordsCount] = await Promise.all([
      this.model
        .aggregate([
          {
            $match: filter ,
          },
          { $sort: { createdAt: sortDirection } },
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: 'workouts',
              let: { workoutId: '$workoutId' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$_id', { $toObjectId: '$$workoutId' }] },
                  },
                },
                {
                  $addFields: {
                    id: { $toString: '$_id' },
                  },
                },
              ],
              as: 'workout',
            },
          },
          { $unwind: '$workout' },
        ])
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      entities: records.map((record) =>
        WorkoutBalanceEntity.fromObject(record),
      ),
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: this.calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }
}
