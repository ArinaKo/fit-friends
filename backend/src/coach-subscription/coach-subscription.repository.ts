import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { CoachSubscriptionEntity } from './coach-subscription.entity';
import { CoachSubscriptionModel } from './coach-subscription.model';

@Injectable()
export class CoachSubscriptionRepository extends BaseMongoRepository<
CoachSubscriptionEntity,
CoachSubscriptionModel
> {
  constructor(
    @InjectModel(CoachSubscriptionModel.name)
    coachSubscriptionModel: Model<CoachSubscriptionModel>,
  ) {
    super(coachSubscriptionModel, CoachSubscriptionEntity.fromObject);
  }

  public async findByCoachId(
    coachId: string,
  ): Promise<CoachSubscriptionEntity | null> {
    const document = await this.model
      .findOne({ coachId })
      .exec();

    if (!document) {
      return null;
    }

    document.id = document._id.toString();
    return this.createEntityFromDocument(document);
  }

  public async addNewWorkout(coachId: string, workoutId: string) {
    this.model
      .findOneAndUpdate(
        { coachId },
        { $push: { newWorkouts: workoutId } },
      )
      .exec();
  }

  public async addNewSubscriber(coachId: string, userId: string) {
    return this.model
      .findOneAndUpdate(
        { coachId },
        { $push: { subscribers: userId } },
      )
      .exec();
  }

  public async removeSubscriber(coachId: string, userId: string) {
    this.model
      .findOneAndUpdate(
        { coachId },
        { $pull: { subscribers: userId } },
      )
      .exec();
  }
}
