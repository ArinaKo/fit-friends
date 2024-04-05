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
import { MongoIdValidationPipe, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { RequestWithTokenPayload } from 'src/shared/requests';

@Controller('subscribe')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/:coachId')
  public async create(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscriberService.addNewSubscription(tokenPayload.sub, coachId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The subscription has been successfully deleted',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Patch('/:coachId')
  public async delete(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscriberService.removeSubscription(tokenPayload.sub, coachId);
  }
}
