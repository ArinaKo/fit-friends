import {
  BadRequestException,
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

@Injectable()
export class WorkoutRequestService {
  constructor(
    private readonly requestRepository: WorkoutRequestRepository,
    private readonly friendsService: FriendsService,
    private readonly userService: UserService,
  ) {}

  public async createWorkoutRequest(
    { userToId }: CreateWorkoutRequestDto,
    userId: string,
  ): Promise<void> {
    if (userId === userToId) {
      throw new BadRequestException(
        `You can not send workout request to yourself`,
      );
    }

    const isUserAFriend = await this.friendsService.checkUserInFriends(
      userId,
      userToId,
    );
    if (!isUserAFriend) {
      throw new BadRequestException(
        `Workout request can be send only for friends`,
      );
    }

    const userStatus = (await this.userService.getUserEntity(userToId)).isReady;
    if (!userStatus) {
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
