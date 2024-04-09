import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';
import { FullWorkoutRdo, WorkoutsWithPaginationRdo } from './rdo';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { MongoIdValidationPipe, Role } from '@app/core';
import { RoleGuard, WorkoutOwnerGuard } from 'src/shared/guards';
import { UserRole } from '@app/types';
import { CoachWorkoutsQuery, WorkoutsQuery } from './query';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiResponse({
    type: WorkoutsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Workouts list',
  })
  @ApiQuery({ type: WorkoutsQuery })
  @Get('/')
  public async index(@Query() query: WorkoutsQuery) {
    return this.workoutService.getAllWorkouts(query);
  }

  @ApiResponse({
    type: WorkoutsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Coach workouts list',
  })
  @ApiQuery({ type: CoachWorkoutsQuery })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Get('/coach')
  public async indexByCoach(
    @Query() query: CoachWorkoutsQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.workoutService.getCoachWorkouts(tokenPayload.sub, query);
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new workout has been successfully created',
  })
  @ApiBody({ type: CreateWorkoutDto })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateWorkoutDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.workoutService.createWorkout(dto, tokenPayload.sub);
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.OK,
    description: 'The workout has been successfully updated',
  })
  @ApiBody({ type: UpdateWorkoutDto })
  @UseGuards(WorkoutOwnerGuard)
  @Patch('/:workoutId')
  public async update(
    @Param('workoutId', MongoIdValidationPipe) workoutId: string,
    @Body() dto: UpdateWorkoutDto,
  ) {
    return this.workoutService.updateWorkout(workoutId, dto);
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.FOUND,
    description: 'Workout found',
  })
  @Get('/:workoutId')
  public async show(@Param('workoutId', MongoIdValidationPipe) id: string) {
    return this.workoutService.getFullWorkout(id);
  }
}
