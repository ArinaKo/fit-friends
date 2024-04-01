import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FullUserRdo, UsersWithPaginationRdo } from './rdo';
import { MongoIdValidationPipe, Role, UserDtoValidationPipe } from '@app/core';
import { RoleGuard } from 'src/shared/guards';
import { UpdateUserDto } from './dto';
import { AuthUserRdo } from 'src/auth/rdo';
import { UpdateUserDtoListing } from './user.const';
import { UsersQuery } from './query';
import { UserRole } from '@app/types';
import { RequestWithTokenPayload } from 'src/shared/requests';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: UsersWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Users list',
  })
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
  @Patch('/')
  public async update(
    @Body(new UserDtoValidationPipe(UpdateUserDtoListing)) dto: UpdateUserDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.userService.updateUser(tokenPayload.sub, dto);
  }
}
