import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
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
import { FullUserRdo, UsersWithPaginationRdo } from './rdo';
import { FileFilter, MongoIdValidationPipe, ParseFile, Role } from '@app/core';
import { RoleGuard } from 'src/shared/guards';
import {
  CoachUserQuestionaryDto,
  DefaultUserQuestionaryDto,
  UpdateUserDto,
} from './dto';
import { AuthUserRdo } from 'src/auth/rdo';
import { UsersQuery } from './query';
import { UserRole } from '@app/types';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DocumentFile } from 'src/shared/const';

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
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get('/:userId')
  public async show(@Param('userId', MongoIdValidationPipe) id: string) {
    return this.userService.getFullUser(id);
  }

  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.OK,
    description: 'User`s info has been successfully updated',
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch('/update')
  public async update(
    @Body() dto: UpdateUserDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.userService.updateUser(tokenPayload.sub, dto);
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
