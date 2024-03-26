import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CreateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';
import { FullWorkoutRdo } from './rdo';
import { fillDto } from '@app/helpers';
import { ApiResponse } from '@nestjs/swagger';
import { RequestWithTokenPayload } from 'src/requests';
import { Role, RoleGuard } from '@app/core';
import { UserRole } from '@app/types';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new workout has been successfully created',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(@Body() dto: CreateWorkoutDto, @Req() { tokenPayload }: RequestWithTokenPayload) {
    const newWorkout = await this.workoutService.createWorkout(dto, tokenPayload.sub);
    return fillDto(FullWorkoutRdo, newWorkout.toPOJO());
  }
}
