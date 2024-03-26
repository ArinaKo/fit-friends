import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { CreateWorkoutDto } from './dto';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async createWorkout(dto: CreateWorkoutDto, coachId: string): Promise<WorkoutEntity> {
    const newWorkout = WorkoutEntity.fromObject(Object.assign(dto, { coachId }));
    await this.workoutRepository.save(newWorkout);

    return newWorkout;
  }
}
