import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiResponse } from '@nestjs/swagger';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { NotificationRdo } from './rdo';

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
}
