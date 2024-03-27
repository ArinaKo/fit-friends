import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';
import { FullWorkoutRdo, WorkoutsWithPaginationRdo } from './rdo';
import { fillDto } from '@app/helpers';
import { ApiResponse } from '@nestjs/swagger';
import { RequestWithTokenPayload } from 'src/requests';
import { MongoIdValidationPipe, Role } from '@app/core';
import { RoleGuard, WorkoutOwnerGuard } from 'src/guards';
import { UserRole } from '@app/types';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiResponse({
    type: WorkoutsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Workouts list'
  })
  @Get('/')
  public async index() {
    const workoutsWithPagination = await this.workoutService.getAllWorkouts();
    return fillDto(WorkoutsWithPaginationRdo, {
      ...workoutsWithPagination,
      workouts: workoutsWithPagination.entities.map((workout) => workout.toPOJO())
    });
  }

  @ApiResponse({
    type: WorkoutsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Coach workouts list'
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Get('/coach')
  public async indexByCoach(@Req() { tokenPayload }: RequestWithTokenPayload) {
    const workoutsWithPagination = await this.workoutService.getCoachWorkouts(tokenPayload.sub);
    return fillDto(WorkoutsWithPaginationRdo, {
      ...workoutsWithPagination,
      workouts: workoutsWithPagination.entities.map((workout) => workout.toPOJO())
    });
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new workout has been successfully created',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateWorkoutDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    const newWorkout = await this.workoutService.createWorkout(
      dto,
      tokenPayload.sub,
    );
    return fillDto(FullWorkoutRdo, newWorkout.toPOJO());
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The workout has been successfully updated',
  })
  @UseGuards(WorkoutOwnerGuard)
  @Patch('/:workoutId')
  public async update(
    @Param('workoutId', MongoIdValidationPipe) workoutId: string,
    @Body() dto: UpdateWorkoutDto,
  ) {
    const updatedWorkout = await this.workoutService.updateWorkout(
      workoutId,
      dto,
    );
    return fillDto(FullWorkoutRdo, updatedWorkout.toPOJO());
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.FOUND,
    description: 'Workout found',
  })
  @Get('/:workoutId')
  public async show(@Param('workoutId', MongoIdValidationPipe) id: string) {
    const { workout, coach } = await this.workoutService.getWorkout(id);
    return fillDto(
      FullWorkoutRdo,
      Object.assign(workout.toPOJO(), { coach: coach.toPOJO() }),
    );
  }
}
