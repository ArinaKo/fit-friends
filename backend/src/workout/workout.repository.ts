import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { WorkoutEntity } from './workout.entity';
import { WorkoutModel } from './workout.model';

const PipelineStage: { [key: string]: PipelineStage } = {
  AddIdString: {
    $addFields: {
      id: { $toString: '$_id' },
    },
  },
};

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

  public async findById(id: string): Promise<WorkoutEntity | null> {
    const document = await this.model
      .aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.AddIdString,
      ])
      .exec()
      .then((r) => r.at(0) || null);

    return this.createEntityFromDocument(document);
  }

  public async find(): Promise<WorkoutEntity[]> {
    const records = await this.model.find().exec();

    if (!records.length) {
      return [];
    }

    const workoutsEntities = this.createEntitiesFromDocuments(records);

    return workoutsEntities;
  }
}
