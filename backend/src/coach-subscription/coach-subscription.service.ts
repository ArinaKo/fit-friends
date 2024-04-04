import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CoachSubscriptionRepository } from './coach-subscription.repository';
import { CoachSubscriptionEntity } from './coach-subscription.entity';
import { TokenPayload, UserRole } from '@app/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CoachSubscriptionService {
  constructor(
    private readonly subscriptionRepository: CoachSubscriptionRepository,
    private readonly userService: UserService,
  ) {}

  private async createSubscription(
    coachId: string,
  ): Promise<CoachSubscriptionEntity> {
    const coach = await this.userService.getUserEntity(coachId);

    if (coach.role !== UserRole.Coach) {
      throw new ConflictException(
        `Subscription can be create only for coach user`,
      );
    }

    const newSubscription = await this.subscriptionRepository.save(
      new CoachSubscriptionEntity({
        coachId,
        newWorkouts: [],
        subscribers: [],
      }),
    );

    return newSubscription;
  }

  public async getSubscription(
    coachId: string,
  ): Promise<CoachSubscriptionEntity> {
    const existsSubscription =
      await this.subscriptionRepository.findByCoachId(coachId);

    if (existsSubscription) {
      return existsSubscription;
    }

    return this.createSubscription(coachId);
  }

  public async addNewWorkout(
    coachId: string,
    workoutId: string,
  ): Promise<void> {
    const existsSubscription = await this.getSubscription(coachId);

    if (existsSubscription.newWorkouts.includes(workoutId)) {
      return;
    }

    this.subscriptionRepository.addNewWorkout(coachId, workoutId);
  }

  public async addNewSubscriber(
    coachId: string,
    userId: string,
  ): Promise<void> {
    const existsSubscription = await this.getSubscription(coachId);

    if (existsSubscription.newWorkouts.includes(userId)) {
      throw new ConflictException(`You are already subscriber`);
    }

    this.subscriptionRepository.addNewSubscriber(coachId, userId);
  }

  public async removeSubscriber(
    coachId: string,
    userId: string,
  ): Promise<void> {
    const existsSubscription = await this.getSubscription(coachId);

    if (!existsSubscription.newWorkouts.includes(userId)) {
      throw new ConflictException(`You are not subscriber`);
    }

    this.subscriptionRepository.removeSubscriber(coachId, userId);
  }

  public async clearWorkouts(coachId: string): Promise<void> {
    const subscription = await this.getSubscription(coachId);

    subscription.newWorkouts = [];
    this.subscriptionRepository.update(subscription.id, subscription);
  }
}
