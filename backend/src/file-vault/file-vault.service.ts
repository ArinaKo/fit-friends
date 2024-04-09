import 'multer';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import appConfig from '@app/config/app.config';
import * as dayjs from 'dayjs';
import { StoredFile } from '@app/types';
import { FileEntity } from './file.entity';
import { FileVaultRepository } from './file-vault.repository';
import { extension } from 'mime-types';
import { DocumentFile, ImageFile, VideoFile } from '../shared/const/index';
import { fillDto } from '@app/helpers';
import { FileRdo } from './rdo';

@Injectable()
export class FileVaultService {
  private readonly logger = new Logger(FileVaultService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(appConfig.KEY)
    private readonly appOptions: ConfigType<typeof appConfig>,
    private readonly fileVaultRepository: FileVaultRepository,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.appOptions.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(
      this.getUploadDirectoryPath(),
      this.getSubUploadDirectoryPath(),
      filename,
    );
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join('uploads', year, month);
  }

  private async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}.${fileExtension}`;

      const filePath = this.getDestinationFilePath(filename);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(filePath, file.buffer);

      return {
        filename,
        filePath: filePath.replace(/\\/g, '/'),
        subDirectory: subDirectory.replace(/\\/g, '/'),
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileRdo> {
    const storedFile = await this.writeFile(file);
    const fileEntity = FileEntity.fromObject({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.filePath,
      size: file.size,
      subDirectory: storedFile.subDirectory,
    });

    const savedFile = await this.fileVaultRepository.save(fileEntity);
    return fillDto(FileRdo, savedFile);
  }

  public async getFile(fileId: string): Promise<FileRdo> {
    const existFile = await this.fileVaultRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return fillDto(FileRdo, existFile);
  }

  public async isFileImage(fileId: string): Promise<boolean> {
    const file = await this.getFile(fileId);
    return ImageFile.MimeTypes.includes(file.mimetype);
  }

  public async isFileVideo(fileId: string): Promise<boolean> {
    const file = await this.getFile(fileId);
    return VideoFile.MimeTypes.includes(file.mimetype);
  }

  public async isFileDocument(fileId: string): Promise<boolean> {
    const file = await this.getFile(fileId);
    return DocumentFile.MimeTypes.includes(file.mimetype);
  }
}
