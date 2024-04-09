import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { NotificationRdo } from './rdo';
import { MongoIdValidationPipe } from '@app/core';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiResponse({
    type: [NotificationRdo],
    status: HttpStatus.OK,
    description: 'User`s notifications',
  })
  @Get('/')
  public async index(@Req() { tokenPayload }: RequestWithTokenPayload) {
    return this.notificationService.getNotifications(tokenPayload.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The notification has been successfully deleted',
  })
  @Delete('/:notificationId')
  public async delete(
    @Param('notificationId', MongoIdValidationPipe) notificationId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.notificationService.deleteNotification(
      notificationId,
      tokenPayload.sub,
    );
  }
}
