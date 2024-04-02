import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { NotificationEntity } from './notification.entity';
import { NotificationModel } from './notification.model';

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
}
