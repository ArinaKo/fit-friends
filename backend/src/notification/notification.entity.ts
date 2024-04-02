import { Entity } from '@app/core';
import { Notification } from '@app/types';

export class NotificationEntity implements Notification, Entity<string> {
  public id?: string;
  public userId: string;
  public text: string;

  constructor(data: Notification) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      text: this.text,
    };
  }

  public populate(data: Notification): void {
    this.id = data.id;
    this.userId = data.userId;
    this.text = data.text;
  }

  static fromObject(data: Notification): NotificationEntity {
    return new NotificationEntity(data);
  }
}
