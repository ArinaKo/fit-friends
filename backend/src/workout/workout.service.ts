import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutEntity } from './workout.entity';
import { CoachWorkoutsQuery, WorkoutsQuery } from './query';
import { DEFAULT_RATING } from 'src/shared/const';
import { FullWorkoutRdo, WorkoutRdo, WorkoutsWithPaginationRdo } from './rdo';
import { fillDto, generateRandomValue } from '@app/helpers';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { WORKOUT_IMAGES_COUNT } from './workout.const';
import { FileVaultService } from 'src/file-vault/file-vault.service';
import { FileMessage } from 'src/shared/messages';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly subscriberService: SubscriberService,
    private readonly fileVaultService: FileVaultService,
  ) {}

  public async getWorkoutEntity(id: string): Promise<WorkoutEntity> {
    const existsWorkout = await this.workoutRepository.findById(id);

    if (!existsWorkout) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    return existsWorkout;
  }

  public async createWorkout(
    dto: CreateWorkoutDto,
    coachId: string,
  ): Promise<FullWorkoutRdo> {
    if (!(await this.fileVaultService.isFileVideo(dto.video))) {
      throw new BadRequestException(FileMessage.UploadedVideoType);
    }

    const newEntity = WorkoutEntity.fromObject(
      Object.assign(dto, {
        coachId,
        rating: DEFAULT_RATING,
        backgroundImage: `/workouts/workout-${generateRandomValue(1, WORKOUT_IMAGES_COUNT)}.png`,
      }),
    );
    const newWorkout = await this.workoutRepository.save(newEntity);
    await this.subscriberService.addNewWorkout(coachId, newWorkout);

    return fillDto(FullWorkoutRdo, newWorkout.toPOJO());
  }

  public async updateWorkout(
    workoutId: string,
    dto: UpdateWorkoutDto,
  ): Promise<FullWorkoutRdo> {
    if (dto.video && !(await this.fileVaultService.isFileVideo(dto.video))) {
      throw new BadRequestException(FileMessage.UploadedVideoType);
    }

    const workout = await this.getWorkoutEntity(workoutId);

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && workout[key] !== value) {
        workout[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return fillDto(FullWorkoutRdo, workout.toPOJO());
    }

    const updatedWorkout = await this.workoutRepository.update(
      workoutId,
      workout,
    );
    return fillDto(FullWorkoutRdo, updatedWorkout.toPOJO());
  }

  public async updateWorkoutRating(workoutId: string) {
    const workout = await this.getWorkoutEntity(workoutId);
    const newRating = await this.workoutRepository.countRating(workoutId);

    if (newRating === workout.rating) {
      return;
    }

    workout.rating = newRating;

    await this.workoutRepository.update(workoutId, workout);
  }

  public async getFullWorkout(id: string): Promise<FullWorkoutRdo> {
    const workout = await this.workoutRepository.findFullWorkout(id);

    if (!workout) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    return fillDto(FullWorkoutRdo, workout.toPOJO());
  }

  public async getCoachId(id: string): Promise<string> {
    const workout = await this.getWorkoutEntity(id);

    return workout.coachId;
  }

  public async getAllWorkouts(
    query?: WorkoutsQuery,
  ): Promise<WorkoutsWithPaginationRdo> {
    const workoutsWithPagination = await this.workoutRepository.find(query);
    return fillDto(WorkoutsWithPaginationRdo, {
      ...workoutsWithPagination,
      workouts: workoutsWithPagination.entities.map((workout) =>
        fillDto(WorkoutRdo, workout.toPOJO()),
      ),
    });
  }

  public async getCoachWorkouts(
    coachId: string,
    query?: CoachWorkoutsQuery,
  ): Promise<WorkoutsWithPaginationRdo> {
    const workoutsWithPagination = await this.workoutRepository.find(
      query,
      coachId,
    );
    return fillDto(WorkoutsWithPaginationRdo, {
      ...workoutsWithPagination,
      workouts: workoutsWithPagination.entities.map((workout) =>
        fillDto(WorkoutRdo, workout.toPOJO()),
      ),
    });
  }
}
