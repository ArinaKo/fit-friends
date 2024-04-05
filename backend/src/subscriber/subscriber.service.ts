import { ConflictException, Injectable } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberEntity } from './subscriber.entity';
import { UserRole } from '@app/types';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { WorkoutEntity } from 'src/workout/workout.entity';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  private async createSubscriber(userId: string): Promise<SubscriberEntity> {
    const user = await this.userService.getUserEntity(userId);

    if (user.role !== UserRole.Default) {
      throw new ConflictException();
    }

    const newSubscriber = await this.subscriberRepository.save(
      new SubscriberEntity({
        userId,
        coaches: [],
        notifications: [],
      }),
    );

    return newSubscriber;
  }

  public async getSubscriber(userId: string): Promise<SubscriberEntity> {
    const existsSubscriber =
      await this.subscriberRepository.findByUserId(userId);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.createSubscriber(userId);
  }

  public async dispatchNotifications(): Promise<void> {
    const subscribers = await this.subscriberRepository.find();

    subscribers.forEach(async (subscriber) => {
      const { userId, notifications } = subscriber;
      const { name, email } = await this.userService.getUserEntity(userId);
      notifications.forEach(async (notification) => {
        await this.mailService.sendNotifyNewWorkout(email, name, notification);
      });
      await this.clearNotifications(userId);
    });
  }

  public async addNewWorkout(
    coachId: string,
    workout: WorkoutEntity,
  ): Promise<void> {
    const coach = await this.userService.getUserEntity(coachId);
    this.subscriberRepository.addNewWorkout(coachId, workout, coach.name);
  }

  public async addNewSubscription(
    userId: string,
    coachId: string,
  ): Promise<void> {
    const coach = await this.userService.getUserEntity(coachId);

    if (coach.role !== UserRole.Coach) {
      throw new ConflictException(`You can subscribe only to coaches`);
    }

    const existsSubscriber = await this.getSubscriber(userId);

    if (existsSubscriber.coaches.includes(coachId)) {
      throw new ConflictException(`You are already subscribed`);
    }

    await this.subscriberRepository.addNewSubscription(userId, coachId);
    await this.mailService.sendNotifyNewSubscription(coachId, userId);
  }

  public async removeSubscription(
    userId: string,
    coachId: string,
  ): Promise<void> {
    const existsSubscriber = await this.getSubscriber(userId);

    if (!existsSubscriber.coaches.includes(coachId)) {
      throw new ConflictException(`You are not subscribed`);
    }

    this.subscriberRepository.removeSubscription(userId, coachId);
  }

  public async clearNotifications(userId: string): Promise<void> {
    const subscriber = await this.getSubscriber(userId);

    subscriber.notifications = [];
    this.subscriberRepository.update(subscriber.id, subscriber);
  }
}
