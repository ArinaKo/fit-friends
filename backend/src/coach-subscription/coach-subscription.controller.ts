import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoachSubscriptionService } from './coach-subscription.service';
import { ApiResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { RequestWithTokenPayload } from 'src/shared/requests';

@Controller('coach-subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: CoachSubscriptionService) {}

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
    await this.subscriptionService.addNewSubscriber(coachId, tokenPayload.sub);
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
    await this.subscriptionService.removeSubscriber(coachId, tokenPayload.sub);
  }
}
