import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { FriendsEntity } from './friends.entity';
import { FriendsModel } from './friends.model';

@Injectable()
export class FriendsRepository extends BaseMongoRepository<
  FriendsEntity,
  FriendsModel
> {
  constructor(
    @InjectModel(FriendsModel.name) FriendsModel: Model<FriendsModel>,
  ) {
    super(FriendsModel, FriendsEntity.fromObject);
  }
}