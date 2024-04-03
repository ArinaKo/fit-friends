import { Module } from '@nestjs/common';
import { FileVaultService } from './file-vault.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { FileVaultRepository } from './file-vault.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  providers: [FileVaultRepository, FileVaultService],
})
export class FileVaultModule {}
