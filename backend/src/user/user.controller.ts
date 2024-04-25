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
import { FullUserRdo, AuthUserRdo, UsersWithPaginationRdo } from './rdo';
import { FileFilter, MongoIdValidationPipe, ParseFile, Role } from '@app/core';
import { RoleGuard } from 'src/shared/guards';
import {
  CoachUserQuestionaryDto,
  DefaultUserQuestionaryDto,
  UpdateUserDto,
} from './dto';
import { UsersQuery } from './query';
import { UserRole } from '@app/types';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DocumentFile, ImageFile } from 'src/shared/const';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.OK,
    description: 'Auth user info',
  })
  @Get('/')
  public async index(@Req() { tokenPayload }: RequestWithTokenPayload) {
    return this.userService.getAuthUser(tokenPayload.sub);
  }

  @ApiResponse({
    type: UsersWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Users list',
  })
  @ApiQuery({ type: UsersQuery })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Get('/all-users')
  public async getUsers(@Query() query: UsersQuery) {
    return this.userService.getAllUsers(query);
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
    status: HttpStatus.OK,
    description: 'Coach`s info has been successfully completed',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CoachUserQuestionaryDto })
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
  @Patch('/questionary-user')
  public async completeUserInfo(
    @Body() dto: DefaultUserQuestionaryDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.userService.completeDefaultUserData(tokenPayload.sub, dto);
  }
}
