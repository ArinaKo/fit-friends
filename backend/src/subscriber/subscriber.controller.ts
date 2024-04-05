import {
  Controller,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { ApiResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe, Public, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { RequestWithTokenPayload } from 'src/shared/requests';

@Controller('subscribe')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notifications have been successfully dispatched',
  })
  @Public()
  @Patch('/dispatch')
  public async dispatch() {
    await this.subscriberService.dispatchNotifications();
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('add/:coachId')
  public async create(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscriberService.addNewSubscription(tokenPayload, coachId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The subscription has been successfully deleted',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('remove/:coachId')
  public async delete(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscriberService.removeSubscription(tokenPayload.sub, coachId);
  }
}
