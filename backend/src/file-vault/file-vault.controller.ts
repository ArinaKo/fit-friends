import 'multer';
import { Express } from 'express';
import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileVaultService } from './file-vault.service';
import { FileFilter, ParseFile, Public, Role } from '@app/core';
import { DocumentFile, ImageFile, VideoFile } from '../shared/const/index';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { FileRdo } from './rdo';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('uploads')
@Controller('upload')
export class FileVaultController {
  constructor(private readonly fileVaultService: FileVaultService) {}

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.CREATED,
    description: 'The file has been successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.CREATED,
    description: 'The file has been successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.CREATED,
    description: 'The file has been successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
