import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { fillDto } from '@app/helpers';
import { FullUserRdo, UsersWithPaginationRdo } from './rdo';
import { MongoIdValidationPipe, Role, RoleGuard, UserDtoValidationPipe } from '@app/core';
import { UpdateUserDto } from './dto';
import { AuthUserRdo } from 'src/auth/rdo';
import { UpdateUserDtoListing } from './user.const';
import { UsersQuery } from './query';
import { UserRole } from '@app/types';

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
    const usersWithPagination = await this.userService.getAllUsers(query);
    return fillDto(UsersWithPaginationRdo, {
      ...usersWithPagination,
      users: usersWithPagination.entities.map((entity) => entity.toPOJO()),
    });
  }

  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get('/:userId')
  public async show(@Param('userId', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getUserById(id);
    return fillDto(FullUserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.OK,
    description: 'User`s info has been successfully updated',
  })
  @Patch('/:userId')
  public async update(
    @Param('userId', MongoIdValidationPipe) id: string,
    @Body(new UserDtoValidationPipe(UpdateUserDtoListing)) dto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, dto);
    return fillDto(AuthUserRdo, updatedUser.toPOJO());
  }
}
