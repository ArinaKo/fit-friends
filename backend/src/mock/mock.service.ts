import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { FileVaultRepository } from 'src/file-vault/file-vault.repository';
import { FriendsRepository } from 'src/friends/friends.repository';
import { OrderRepository } from 'src/order/order.repository';
import { WorkoutRequestRepository } from 'src/workout-request/workout-request.repository';
import { WorkoutRepository } from 'src/workout/workout.repository';
import { NotificationRepository } from 'src/notification/notification.repository';
import { SubscriberRepository } from 'src/subscriber/subscriber.repository';
import { WorkoutService } from 'src/workout/workout.service';
import { BalanceService } from 'src/balance/balance.service';
import {
  generateAvatarsEntities,
  generateCertificatesEntities,
  generateVideosEntities,
  generateUsersEntities,
  generateWorkoutsEntities,
  generateCommentsEntities,
  generateRequestsEntities,
  generateOrdersEntities,
  generateFriendsEntities,
  generateNotificationsEntities,
  generateSubscribersEntities,
} from './generate';
import { WorkoutEntity } from 'src/workout/workout.entity';
import { GeneratedDataAmount } from './mock.const';
import { Emails } from './generate/mock-data';

@Injectable()
export class MockService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly workoutRepository: WorkoutRepository,
    private readonly friendsRepository: FriendsRepository,
    private readonly orderRepository: OrderRepository,
    private readonly commentRepository: CommentRepository,
    private readonly workoutRequestRepository: WorkoutRequestRepository,
    private readonly fileVaultRepository: FileVaultRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly subscriberRepository: SubscriberRepository,
    private readonly workoutService: WorkoutService,
    private readonly balanceService: BalanceService,
  ) {}

  private async registerFilesInfo(): Promise<{
    avatarsIds: string[];
    certificatesIds: string[];
    videosIds: string[];
  }> {
    const avatarsIds = (
      await this.fileVaultRepository.saveMany(generateAvatarsEntities())
    ).map((entity) => entity.id!);
    const certificatesIds = (
      await this.fileVaultRepository.saveMany(generateCertificatesEntities())
    ).map((entity) => entity.id!);
    const videosIds = (
      await this.fileVaultRepository.saveMany(generateVideosEntities())
    ).map((entity) => entity.id!);

    return { avatarsIds, certificatesIds, videosIds };
  }

  private async registerUsers(
    avatarsIds: string[],
    certificatesIds: string[],
  ): Promise<string[]> {
    return (
      await this.userRepository.saveMany(
        await generateUsersEntities(avatarsIds, certificatesIds),
      )
    ).map((entity) => entity.id!);
  }

  private async registerWorkouts(
    coachesIds: string[],
    videosIds: string[],
  ): Promise<WorkoutEntity[]> {
    return this.workoutRepository.saveMany(
      generateWorkoutsEntities(coachesIds, videosIds),
    );
  }

  private async registerComments(
    workoutsIds: string[],
    usersIds: string[],
  ): Promise<void> {
    this.commentRepository.saveMany(
      generateCommentsEntities(workoutsIds, usersIds),
    );
  }

  private async registerRequests(
    usersIds: string[],
    allUsersIds: string[],
  ): Promise<void> {
    this.workoutRequestRepository.saveMany(
      generateRequestsEntities(usersIds, allUsersIds),
    );
  }

  private async registerOrders(
    usersIds: string[],
    workouts: WorkoutEntity[],
  ): Promise<void> {
    const orders = await this.orderRepository.saveMany(
      generateOrdersEntities(usersIds, workouts),
    );
    orders.forEach(async (order) => {
      await this.balanceService.increaseBalance(
        order.userId,
        order.workoutId,
        order.count,
      );
    });
  }

  private async registerFriends(allUsersIds: string[]): Promise<void> {
    this.friendsRepository.saveMany(generateFriendsEntities(allUsersIds));
  }

  private async registerSubscribers(
    usersIds: string[],
    coachesIds: string[],
  ): Promise<void> {
    this.subscriberRepository.saveMany(
      generateSubscribersEntities(usersIds, coachesIds),
    );
  }

  private async registerNotifications(allUsersIds: string[]): Promise<void> {
    this.notificationRepository.saveMany(
      generateNotificationsEntities(allUsersIds),
    );
  }

  public async generateMocks(): Promise<void> {
    if (await this.userRepository.findByEmail(Emails[0])) {
      throw new ConflictException(
        `Before generating more data, change emails in file 'mock-data.ts' to prevent errors`,
      );
    }

    const { avatarsIds, certificatesIds, videosIds } =
      await this.registerFilesInfo();
    const allUsersIds = await this.registerUsers(avatarsIds, certificatesIds);
    const coachesIds = allUsersIds.slice(0, GeneratedDataAmount.Coaches);
    const usersIds = allUsersIds.slice(GeneratedDataAmount.Coaches);
    const workouts = await this.registerWorkouts(coachesIds, videosIds);
    const workoutsIds = workouts.map((entity) => entity.id!);
    await this.registerComments(workoutsIds, usersIds);
    await this.registerRequests(usersIds, allUsersIds);
    await this.registerOrders(usersIds, workouts);
    await this.registerFriends(allUsersIds);
    await this.registerSubscribers(usersIds, coachesIds);
    await this.registerNotifications(allUsersIds);

    await Promise.allSettled(
      workoutsIds.map(async (workoutId) => {
        await this.workoutService.updateWorkoutRating(workoutId);
      }),
    );
  }
}
