import { Injectable } from '@nestjs/common';
import { NotificationEntity } from './notification.entity';
import { NotificationRepository } from './notification.repository';
import { NotificationRdo } from './rdo';
import { fillDto } from '@app/helpers';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async createNotification(userId: string, text: string): Promise<void> {
    const newNotification = NotificationEntity.fromObject({
      userId,
      text,
    });
    await this.notificationRepository.save(newNotification);
  }

  public async getNotifications(userId: string): Promise<NotificationRdo[]> {
    const notifications = await this.notificationRepository.find(userId);
    return notifications.map((notification) =>
      fillDto(NotificationRdo, notification.toPOJO()),
    );
  }
}
