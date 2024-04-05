import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberModel } from './subscriber.model';

@Injectable()
export class SubscriberRepository extends BaseMongoRepository<
  SubscriberEntity,
  SubscriberModel
> {
  constructor(
    @InjectModel(SubscriberModel.name)
    SubscriberModel: Model<SubscriberModel>,
  ) {
    super(SubscriberModel, SubscriberEntity.fromObject);
  }

  public async findByUserId(
    userId: string,
  ): Promise<SubscriberEntity | null> {
    const document = await this.model.findOne({ userId }).exec();

    if (!document) {
      return null;
    }

    document.id = document._id.toString();
    return this.createEntityFromDocument(document);
  }

  public async addNewWorkout(coachId: string, workoutId: string) {
    this.model
      .updateMany({ coaches: coachId }, { $push: { newWorkouts: workoutId } })
      .exec();
  }

  public async addNewSubscription(userId: string, coachId: string) {
    this.model
      .findOneAndUpdate({ userId }, { $push: { coaches: coachId } })
      .exec();
  }

  public async removeSubscription(userId: string, coachId: string) {
    this.model
      .findOneAndUpdate({ userId }, { $pull: { coaches: coachId } })
      .exec();
  }
}
