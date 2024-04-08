import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { WorkoutRequestEntity } from './workout-request.entity';
import { WorkoutRequestModel } from './workout-request.model';
import { DEFAULT_REQUEST_STATUS } from 'src/shared/const';

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

  public async isRequestPending(
    userFromId: string,
    userToId: string,
  ): Promise<boolean> {
    const request = await this.model.findOne({
      userFromId,
      userToId,
      status: DEFAULT_REQUEST_STATUS,
    });

    return Boolean(request);
  }
}
