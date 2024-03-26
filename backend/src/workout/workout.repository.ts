import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { WorkoutEntity } from './workout.entity';
import { WorkoutModel } from './workout.model';

@Injectable()
export class WorkoutRepository extends BaseMongoRepository<
  WorkoutEntity,
  WorkoutModel
> {
  constructor(
    @InjectModel(WorkoutModel.name) WorkoutModel: Model<WorkoutModel>,
  ) {
    super(WorkoutModel, WorkoutEntity.fromObject);
  }
}
