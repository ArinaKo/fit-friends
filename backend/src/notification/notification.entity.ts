import { Entity } from '@app/core';
import { Notification } from '@app/types';

export class NotificationEntity implements Notification, Entity<string> {
  public id?: string;
  public userId: string;
  public text: string;
  public date?: Date;

  constructor(data: Notification) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      text: this.text,
      date: this.date,
    };
  }

  public populate(data: Notification): void {
    this.id = data.id;
    this.userId = data.userId;
    this.text = data.text;
    this.date = data.date;
  }

  static fromObject(data: Notification): NotificationEntity {
    return new NotificationEntity(data);
  }
}
