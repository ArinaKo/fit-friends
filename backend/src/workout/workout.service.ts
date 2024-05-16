import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutEntity } from './workout.entity';
import { CoachWorkoutsQuery, WorkoutsQuery } from './query';
import { DEFAULT_RATING, SexEnumsRelation } from 'src/shared/const';
import { FullWorkoutRdo, WorkoutRdo, WorkoutsWithPaginationRdo } from './rdo';
import { fillDto, generateRandomValue } from '@app/helpers';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { WORKOUT_IMAGES_COUNT } from './workout.const';
import { FileVaultService } from 'src/file-vault/file-vault.service';
import { UserService } from 'src/user/user.service';
import { WorkoutsForUserFilter } from '@app/types';
import { FileRdo } from 'src/file-vault/rdo';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly subscriberService: SubscriberService,
    private readonly fileVaultService: FileVaultService,
    private readonly userService: UserService,
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
    video: Express.Multer.File,
  ): Promise<FullWorkoutRdo> {
    const videoId = (await this.fileVaultService.saveFile(video)).id;

    const newEntity = WorkoutEntity.fromObject(
      Object.assign(dto, {
        coachId,
        rating: DEFAULT_RATING,
        backgroundImage: `/mocks/workout-${generateRandomValue(1, WORKOUT_IMAGES_COUNT)}.jpg`,
        isSpecial: false,
        video: videoId,
      }),
    );
    const newWorkout = await this.workoutRepository.save(newEntity);
    await this.subscriberService.addNewWorkout(coachId, newWorkout);

    const fullWorkout = await this.workoutRepository.findFullWorkout(
      newWorkout.id!,
    );
    return fillDto(FullWorkoutRdo, fullWorkout!.toPOJO());
  }

  public async updateWorkout(
    workoutId: string,
    dto: UpdateWorkoutDto,
  ): Promise<FullWorkoutRdo> {
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

    await this.workoutRepository.update(workoutId, workout);

    const fullWorkout = await this.workoutRepository.findFullWorkout(workoutId);
    return fillDto(FullWorkoutRdo, fullWorkout!.toPOJO());
  }

  public async updateWorkoutVideo(
    workoutId: string,
    video: Express.Multer.File,
  ): Promise<FileRdo> {
    const workout = await this.getWorkoutEntity(workoutId);

    const newVideo = await this.fileVaultService.saveFile(video);
    workout.video = newVideo.id!;

    await this.workoutRepository.update(workoutId, workout);
    return fillDto(FileRdo, newVideo.toPOJO());
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

  public async getSpecialWorkouts(): Promise<WorkoutRdo[]> {
    const workouts = await this.workoutRepository.findSpecial();
    return workouts.map((workout) => fillDto(WorkoutRdo, workout.toPOJO()));
  }

  public async getPopularWorkouts(): Promise<WorkoutRdo[]> {
    const workouts = await this.workoutRepository.findPopular();
    return workouts.map((workout) => fillDto(WorkoutRdo, workout.toPOJO()));
  }

  public async getWorkoutsForUser(userId: string): Promise<WorkoutRdo[]> {
    const { level, sex, workoutTypes, timeForWorkout } =
      await this.userService.getUserEntity(userId);
    const filter: WorkoutsForUserFilter = {
      level,
      sex: SexEnumsRelation[sex],
      types: workoutTypes,
      duration: timeForWorkout,
    };
    const workouts = await this.workoutRepository.findForUser(filter);
    return workouts.map((workout) => fillDto(WorkoutRdo, workout.toPOJO()));
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

  public async getWorkoutsByCoach(
    coachId: string,
  ): Promise<WorkoutsWithPaginationRdo> {
    const workoutsWithPagination = await this.workoutRepository.find(
      undefined,
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
