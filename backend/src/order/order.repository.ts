import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository, PaginationResult } from '@app/core';
import { OrderEntity } from './order.entity';
import { OrderModel } from './order.model';
import { WorkoutOrdersEntity } from './workout-orders.entity';
import { WorkoutsOrdersQuery } from './query';
import { DEFAULT_PAGE, DEFAULT_SORTING, LIST_LIMIT } from 'src/const';
import { DEFAULT_SORTING_TYPE } from './orders.const';

@Injectable()
export class OrderRepository extends BaseMongoRepository<
  OrderEntity,
  OrderModel
> {
  constructor(@InjectModel(OrderModel.name) OrderModel: Model<OrderModel>) {
    super(OrderModel, OrderEntity.fromObject);
  }

  public async find(
    coachId: string,
    query?: WorkoutsOrdersQuery,
  ): Promise<PaginationResult<WorkoutOrdersEntity>> {
    const sortDirection = query?.sortDirection ?? DEFAULT_SORTING;
    const sortType = query?.sortingType ?? DEFAULT_SORTING_TYPE;
    const limit = query?.limit ?? LIST_LIMIT;
    const skip = query?.page ? (query.page - 1) * limit : 0;

    const records = await this.model
      .aggregate([
        {
          $group: {
            _id: '$workoutId',
            count: { $sum: 1 },
            sum: { $sum: '$totalPrice' },
          },
        },
        {
          $lookup: {
            from: 'workouts',
            let: { workoutId: '$_id' },
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
        {
          $match: {
            'workout.coachId': coachId,
          },
        },
        { $sort: { [sortType]: sortDirection } },
      ])
      .exec();

    const recordsCount = records.length;

    const recordsLimited = records.slice(skip, skip + limit);

    return {
      entities: recordsLimited.map((record) =>
        WorkoutOrdersEntity.fromObject(record),
      ),
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: this.calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }
}
