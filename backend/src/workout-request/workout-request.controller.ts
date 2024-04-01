import { MongoIdValidationPipe, Role } from '@app/core';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkoutRequestService } from './workout-request.service';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { CreateWorkoutRequestDto, UpdateRequestStatusDto } from './dto';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { ApiResponse } from '@nestjs/swagger';

@Controller('workout-requests')
export class WorkoutRequestController {
  constructor(private readonly requestService: WorkoutRequestService) {}

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
    await this.requestService.createWorkoutRequest(dto, tokenPayload.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The workout status has been successfully updated',
  })
  @Patch('/')
  public async update(
    @Body() dto: UpdateRequestStatusDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.requestService.updateRequestStatus(dto, tokenPayload.sub);
  }
}
