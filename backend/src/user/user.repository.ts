import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@app/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(@InjectModel(UserModel.name) UserModel: Model<UserModel>) {
    super(UserModel, UserEntity.fromObject);
  }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }
}
