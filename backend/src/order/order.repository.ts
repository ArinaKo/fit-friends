import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { OrderEntity } from './order.entity';
import { OrderModel } from './order.model';
import { WorkoutOrdersEntity } from './workout-orders.entity';

@Injectable()
export class OrderRepository extends BaseMongoRepository<
  OrderEntity,
  OrderModel
> {
  constructor(@InjectModel(OrderModel.name) OrderModel: Model<OrderModel>) {
    super(OrderModel, OrderEntity.fromObject);
  }

  public async find(coachId: string): Promise<WorkoutOrdersEntity[]> {
    const records = await this.model
      .aggregate([
        {
          $group: {
            _id: '$workoutId',
            totalCount: { $sum: 1 },
            totalSum: { $sum: '$totalPrice' },
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
      ])
      .exec();

    const recordsEntities = records.map((record) => WorkoutOrdersEntity.fromObject(record));

    return recordsEntities;
  }
}
