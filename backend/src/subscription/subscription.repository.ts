import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionModel } from './subscription.model';

@Injectable()
export class SubscriptionRepository extends BaseMongoRepository<
  SubscriptionEntity,
  SubscriptionModel
> {
  constructor(
    @InjectModel(SubscriptionModel.name)
    SubscriptionModel: Model<SubscriptionModel>,
  ) {
    super(SubscriptionModel, SubscriptionEntity.fromObject);
  }

  public async findByUsersIds(
    userId: string,
    coachId: string,
  ): Promise<SubscriptionEntity | null> {
    const document = await this.model
      .findOne({ 'coachId': coachId, 'subscriber.userId': userId })
      .exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }
}
