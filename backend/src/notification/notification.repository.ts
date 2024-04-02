import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { NotificationEntity } from './notification.entity';
import { NotificationModel } from './notification.model';
import { DEFAULT_SORT_DIRECTION } from 'src/shared/const';
import { NOTIFICATIONS_LIMIT } from './notification.const';

@Injectable()
export class NotificationRepository extends BaseMongoRepository<
  NotificationEntity,
  NotificationModel
> {
  constructor(
    @InjectModel(NotificationModel.name)
    NotificationModel: Model<NotificationModel>,
  ) {
    super(NotificationModel, NotificationEntity.fromObject);
  }

  public async find(userId: string): Promise<NotificationEntity[]> {
    const records = await this.model
      .aggregate([
        { $match: { userId } },
        { $sort: { createdAt: DEFAULT_SORT_DIRECTION } },
        { $limit: NOTIFICATIONS_LIMIT },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
      ])
      .exec();
    return this.createEntitiesFromDocuments(records);
  }
}
