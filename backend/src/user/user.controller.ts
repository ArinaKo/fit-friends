import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  FullUserRdo,
  AuthUserRdo,
  UsersWithPaginationRdo,
  UserRdo,
} from './rdo';
import { FileFilter, MongoIdValidationPipe, ParseFile, Role } from '@app/core';
import { RoleGuard } from 'src/shared/guards';
import {
  CoachUserQuestionaryDto,
  DefaultUserQuestionaryDto,
  DeleteCertificateDto,
  UpdateCertificateDto,
  UpdateUserDto,
  UploadCertificateDto,
} from './dto';
import { UsersQuery } from './query';
import { UserRole } from '@app/types';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DocumentFile, ImageFile } from 'src/shared/const';
import { FileRdo } from 'src/file-vault/rdo';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: UsersWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Users list',
  })
  @ApiQuery({ type: UsersQuery })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Get('/')
  public async index(@Query() query: UsersQuery) {
    return this.userService.getAllUsers(query);
  }

  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.OK,
    description: 'Auth user info',
  })
  @Get('/my-data')
  public async getAuthUser(@Req() { tokenPayload }: RequestWithTokenPayload) {
    return this.userService.getAuthUser(tokenPayload.sub);
  }

  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'User`s info has been successfully updated',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
  @Patch('/update')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: FileFilter(ImageFile.MimeTypes, ImageFile.MaxSize),
    }),
  )
  public async update(
    @Body() dto: UpdateUserDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.updateUser(tokenPayload.sub, dto, avatar);
  }

  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
    description: 'Users ready fo workout',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Get('/ready-users')
  public async getReadyUsers() {
    return this.userService.getReadyUsers();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Coach`s info has been successfully completed',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CoachUserQuestionaryDto })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Patch('/questionary-coach')
  @UseInterceptors(
    FilesInterceptor('certificates', undefined, {
      fileFilter: FileFilter(DocumentFile.MimeTypes),
    }),
  )
  public async completeCoachInfo(
    @Body() dto: CoachUserQuestionaryDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @UploadedFiles(ParseFile) certificates: Array<Express.Multer.File>,
  ) {
    await this.userService.completeCoachData(
      tokenPayload.sub,
      dto,
      certificates,
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User`s info has been successfully completed',
  })
  @ApiBody({ type: DefaultUserQuestionaryDto })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/questionary-user')
  public async completeUserInfo(
    @Body() dto: DefaultUserQuestionaryDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.userService.completeDefaultUserData(tokenPayload.sub, dto);
  }

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.OK,
    description: 'Certificate has been successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadCertificateDto })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Patch('/certificates/upload')
  @UseInterceptors(
    FileInterceptor('certificate', {
      fileFilter: FileFilter(DocumentFile.MimeTypes),
    }),
  )
  public async uploadCertificate(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @UploadedFile(ParseFile) certificate: Express.Multer.File,
  ) {
    return this.userService.uploadCertificate(tokenPayload.sub, certificate);
  }

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.OK,
    description: 'Certificate has been successfully updated',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCertificateDto })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Patch('/certificates/update')
  @UseInterceptors(
    FileInterceptor('newCertificate', {
      fileFilter: FileFilter(DocumentFile.MimeTypes),
    }),
  )
  public async updateCertificate(
    @Body() dto: UpdateCertificateDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @UploadedFile(ParseFile) certificate: Express.Multer.File,
  ) {
    return this.userService.updateCertificate(
      tokenPayload.sub,
      dto.oldCertificateId,
      certificate,
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Certificate has been successfully deleted',
  })
  @ApiBody({ type: DeleteCertificateDto })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Patch('/certificates/delete')
  public async deleteCertificate(
    @Body() dto: DeleteCertificateDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.userService.deleteCertificate(
      tokenPayload.sub,
      dto.certificateId,
    );
  }

  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get('/:userId')
  public async getUserInfo(@Param('userId', MongoIdValidationPipe) id: string) {
    return this.userService.getFullUser(id);
  }
}
