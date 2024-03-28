import {
  Body,
  Controller,
  HttpStatus,
  Patch,
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

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

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
}
