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
import { FullUserRdo, UsersWithPaginationRdo } from './rdo';
import { MongoIdValidationPipe, Role, UserDtoValidationPipe } from '@app/core';
import { RoleGuard } from 'src/guards';
import { UpdateUserDto } from './dto';
import { AuthUserRdo } from 'src/auth/rdo';
import { UpdateUserDtoListing } from './user.const';
import { UsersQuery } from './query';
import { UserRole } from '@app/types';
import { OwnerGuard } from 'src/guards';

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
  @UseGuards(OwnerGuard)
  @Patch('/:userId')
  public async update(
    @Param('userId', MongoIdValidationPipe) id: string,
    @Body(new UserDtoValidationPipe(UpdateUserDtoListing)) dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }
}
