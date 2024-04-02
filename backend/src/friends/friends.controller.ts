import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiResponse } from '@nestjs/swagger';
import { Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { UpdateFriendsDto } from './dto';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { BaseQuery } from 'src/shared/query/base.query';
import { UsersWithPaginationRdo } from 'src/user/rdo';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiResponse({
    type: UsersWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Friends list',
  })
  @Get('/')
  public async index(
    @Query() query: BaseQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.friendsService.getFriendsList(tokenPayload.sub, query);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new friend has been successfully added',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/add')
  public async addFriend(
    @Body() dto: UpdateFriendsDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.friendsService.addFriend(tokenPayload, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The friend has been successfully removed',
  })
  @Patch('/remove')
  public async removeFriend(
    @Body() dto: UpdateFriendsDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.friendsService.removeFriend(tokenPayload.sub, dto);
  }
}
