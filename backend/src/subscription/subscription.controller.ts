import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { RequestWithTokenPayload } from 'src/shared/requests';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Post('/:coachId')
  public async create(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscriptionService.createSubscription(coachId, tokenPayload);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The subscription has been successfully deleted',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Delete('/:coachId')
  public async delete(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscriptionService.deleteSubscription(coachId, tokenPayload.sub);
  }
}
