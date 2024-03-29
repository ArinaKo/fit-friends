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
import { RoleGuard } from 'src/guards';
import { UpdateFriendsDto } from './dto';
import { RequestWithTokenPayload } from 'src/requests';
import { FriendsWithPaginationRdo } from './rdo';
import { fillDto } from '@app/helpers';
import { BaseQuery } from 'src/query/base.query';
import { UserRdo } from 'src/user/rdo';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiResponse({
    type: FriendsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Friends list',
  })
  @Get('/')
  public async index(
    @Query() query: BaseQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    const friendsWithPagination = await this.friendsService.getFriendsList(
      tokenPayload.sub,
      query,
    );
    return fillDto(FriendsWithPaginationRdo, {
      ...friendsWithPagination,
      friends: friendsWithPagination.entities.map((entity) => fillDto(UserRdo, entity.toPOJO())),
    });
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
    await this.friendsService.addFriend(tokenPayload.sub, dto);
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
