import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { FileVaultRepository } from 'src/file-vault/file-vault.repository';
import { FriendsRepository } from 'src/friends/friends.repository';
import { OrderRepository } from 'src/order/order.repository';
import { WorkoutRequestRepository } from 'src/workout-request/workout-request.repository';
import { WorkoutRepository } from 'src/workout/workout.repository';

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
  ) {}

  public async generateMocks(): Promise<void> {}
}
