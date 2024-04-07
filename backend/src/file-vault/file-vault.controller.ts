import 'multer';
import { Express } from 'express';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileVaultService } from './file-vault.service';
import { FileFilter, ParseFile, Public, Role } from '@app/core';
import { DocumentFile, ImageFile, VideoFile } from './file-vault.const';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';

@Controller('upload')
export class FileVaultController {
  constructor(private readonly fileVaultService: FileVaultService) {}

  @Public()
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilter(ImageFile.MimeTypes, ImageFile.MaxSize),
    }),
  )
  public async uploadImage(@UploadedFile(ParseFile) file: Express.Multer.File) {
    return this.fileVaultService.saveFile(file);
  }

  @Public()
  @Post('/document')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilter(DocumentFile.MimeTypes),
    }),
  )
  public async uploadDocument(
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ) {
    return this.fileVaultService.saveFile(file);
  }

  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Post('/video')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilter(VideoFile.MimeTypes),
    }),
  )
  public async uploadVideo(@UploadedFile(ParseFile) file: Express.Multer.File) {
    return this.fileVaultService.saveFile(file);
  }
}
