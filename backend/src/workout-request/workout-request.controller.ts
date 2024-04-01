import { Role } from '@app/core';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkoutRequestService } from './workout-request.service';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { CreateWorkoutRequestDto } from './dto';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { ApiResponse } from '@nestjs/swagger';

@Controller('workout-requests')
export class WorkoutRequestController {
  constructor(private readonly WorkoutRequestService: WorkoutRequestService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new workout request has been successfully created',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateWorkoutRequestDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.WorkoutRequestService.createWorkoutRequest(
      dto,
      tokenPayload.sub,
    );
  }
}
