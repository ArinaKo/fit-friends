import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EmailSubject, EmailTemplates } from './mail.const';
import { mailConfig } from '@app/config';
import { WorkoutNotification } from '@app/types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(mailConfig.KEY)
  private readonly mailConfig: ConfigType<typeof mailConfig>;

  public async sendNotifyNewSubscription(
    email: string,
    userName: string,
    coachName: string,
  ) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: email,
      subject: EmailSubject.NewSubscription,
      template: EmailTemplates.NewSubscription,
      context: {
        coachName,
        userName,
      },
    });
  }

  public async sendNotifyNewWorkout(
    email: string,
    userName: string,
    notification: WorkoutNotification,
  ) {
    const { title, type, description, calories, coachName } = notification;

    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: email,
      subject: EmailSubject.NewWorkout,
      template: EmailTemplates.NewWorkout,
      context: {
        userName,
        coachName,
        title,
        type,
        description,
        calories,
      },
    });
  }
}
