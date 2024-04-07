import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutRequestRepository } from './workout-request.repository';
import { UserService } from 'src/user/user.service';
import { CreateWorkoutRequestDto, UpdateRequestStatusDto } from './dto';
import { WorkoutRequestEntity } from './workout-request.entity';
import { DEFAULT_REQUEST_STATUS } from 'src/shared/const';
import { FriendsService } from 'src/friends/friends.service';
import { TokenPayload, UserRole } from '@app/types';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationText } from 'src/notification/notification.const';

@Injectable()
export class WorkoutRequestService {
  constructor(
    private readonly requestRepository: WorkoutRequestRepository,
    private readonly friendsService: FriendsService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  public async createWorkoutRequest(
    { userToId }: CreateWorkoutRequestDto,
    tokenPayload: TokenPayload,
  ): Promise<void> {
    const { sub: userId, name: userName } = tokenPayload;

    if (userId === userToId) {
      throw new BadRequestException(
        `You can not send workout request to yourself`,
      );
    }

    const areUsersFriends =
      (await this.friendsService.checkUserInFriends(userId, userToId)) &&
      (await this.friendsService.checkUserInFriends(userToId, userId));

    if (!areUsersFriends) {
      throw new BadRequestException(
        `Workout request can be send only between friends`,
      );
    }

    if (await this.requestRepository.isRequestPending(userId, userToId)) {
      throw new ConflictException(
        `Previous request is still waiting for a response`,
      );
    }

    const userTo = await this.userService.getUserEntity(userToId);
    if (!userTo.isReady) {
      throw new BadRequestException(
        `User with id ${userToId} is not ready for workout`,
      );
    }

    const newWorkoutRequest = WorkoutRequestEntity.fromObject({
      userFromId: userId,
      userToId,
      status: DEFAULT_REQUEST_STATUS,
    });
    await this.requestRepository.save(newWorkoutRequest);

    await this.notificationService.createNotification(
      userToId,
      userTo.role === UserRole.Coach
        ? NotificationText.getCoachWorkoutRequestMessage(userName)
        : NotificationText.getWorkoutRequestMessage(userName),
    );
  }

  public async updateRequestStatus(
    dto: UpdateRequestStatusDto,
    userId: string,
  ) {
    const workoutRequest = await this.requestRepository.findById(dto.requestId);

    if (!workoutRequest) {
      throw new NotFoundException(
        `Workout request with id ${dto.requestId} not found.`,
      );
    }

    if (workoutRequest.userToId !== userId) {
      throw new ForbiddenException();
    }

    if (workoutRequest.status === dto.status) {
      return;
    }

    workoutRequest.status = dto.status;

    await this.requestRepository.update(workoutRequest.id, workoutRequest);
  }
}
