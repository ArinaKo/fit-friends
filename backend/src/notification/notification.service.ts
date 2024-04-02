import { Injectable } from '@nestjs/common';
import { NotificationEntity } from './notification.entity';
import { NotificationRepository } from './notification.repository';

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
}
