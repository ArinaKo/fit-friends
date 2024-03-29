import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutEntity } from './workout.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { PaginationResult } from '@app/core';
import { CoachWorkoutsQuery, WorkoutsQuery } from './query';
import { DEFAULT_RATING } from 'src/const';

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
      Object.assign(dto, { coachId, rating: DEFAULT_RATING }),
    );
    await this.workoutRepository.save(newWorkout);

    return newWorkout;
  }

  public async getWorkout(id: string): Promise<WorkoutEntity> {
    const existsWorkout = await this.workoutRepository.findById(id);

    if (!existsWorkout) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    return existsWorkout;
  }

  public async updateWorkout(
    workoutId: string,
    dto: UpdateWorkoutDto,
  ): Promise<WorkoutEntity> {
    const workout = await this.getWorkout(workoutId);

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && workout[key] !== value) {
        workout[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return workout;
    }

    return this.workoutRepository.update(workoutId, workout);
  }

  public async getFullWorkout(
    id: string,
  ): Promise<{ workout: WorkoutEntity; coach: UserEntity }> {
    const workout = await this.getWorkout(id);

    const coach = await this.userService.getUserById(workout.coachId);

    return { workout, coach };
  }

  public async getCoachId(id: string): Promise<string> {
    const workout = await this.getWorkout(id);

    return workout.coachId;
  }

  public async getAllWorkouts(
    query?: WorkoutsQuery,
  ): Promise<PaginationResult<WorkoutEntity>> {
    return this.workoutRepository.find(query);
  }

  public async getCoachWorkouts(
    coachId: string,
    query?: CoachWorkoutsQuery,
  ): Promise<PaginationResult<WorkoutEntity>> {
    return this.workoutRepository.find(query, coachId);
  }
}
