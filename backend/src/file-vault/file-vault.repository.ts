import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileEntity } from './file.entity';
import { FileModel } from './file.model';
import { BaseMongoRepository } from '@app/core';

@Injectable()
export class FileVaultRepository extends BaseMongoRepository<FileEntity, FileModel> {
  constructor(@InjectModel(FileModel.name) fileModel: Model<FileModel>) {
    super(fileModel, FileEntity.fromObject);
  }
}
