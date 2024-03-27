import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { CreateWorkoutDto } from './dto';
import { WorkoutEntity } from './workout.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly userService: UserService,
  ) {}

  public async createWorkout(
    dto: CreateWorkoutDto,
    coachId: string,
  ): Promise<WorkoutEntity> {
    const newWorkout = WorkoutEntity.fromObject(
      Object.assign(dto, { coachId }),
    );
    await this.workoutRepository.save(newWorkout);

    return newWorkout;
  }

  public async getWorkout(
    id: string,
  ): Promise<{ workout: WorkoutEntity; coach: UserEntity }> {
    const existsWorkout = await this.workoutRepository.findById(id);

    if (!existsWorkout) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    const coach = await this.userService.getUserById(existsWorkout.coachId);

    return { workout: existsWorkout, coach };
  }

  public async getCoachId(id: string): Promise<string> {
    const existsWorkout = await this.workoutRepository.findById(id);

    if (!existsWorkout) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    return existsWorkout.coachId;
  }
}
