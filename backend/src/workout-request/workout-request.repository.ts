import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { WorkoutRequestEntity } from './workout-request.entity';
import { WorkoutRequestModel } from './workout-request.model';

@Injectable()
export class WorkoutRequestRepository extends BaseMongoRepository<
  WorkoutRequestEntity,
  WorkoutRequestModel
> {
  constructor(
    @InjectModel(WorkoutRequestModel.name)
    WorkoutRequestModel: Model<WorkoutRequestModel>,
  ) {
    super(WorkoutRequestModel, WorkoutRequestEntity.fromObject);
  }

  public async findByUsersIds(
    userFromId: string,
    userToId: string,
  ): Promise<WorkoutRequestEntity | null> {
    const document = await this.model
      .aggregate([
        { $match: { userFromId, userToId } },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return this.createEntityFromDocument(document);
  }
}
