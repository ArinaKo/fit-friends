import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { BalanceEntity } from './balance.entity';
import { BalanceModel } from './balance.model';

@Injectable()
export class BalanceRepository extends BaseMongoRepository<
  BalanceEntity,
  BalanceModel
> {
  constructor(
    @InjectModel(BalanceModel.name) BalanceModel: Model<BalanceModel>,
  ) {
    super(BalanceModel, BalanceEntity.fromObject);
  }

  public async findBalance(
    userId: string,
    workoutId: string,
  ): Promise<BalanceEntity | null> {
    const document = await this.model.findOne({ userId, workoutId }).exec();

    if (!document) {
      return null;
    }

    document.id = document._id.toString();
    return this.createEntityFromDocument(document);
  }
}
