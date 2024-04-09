import { Role } from '@app/core';
import {
  Body,
  Controller,
  HttpStatus,
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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('workout-requests')
@Controller('workout-requests')
export class WorkoutRequestController {
  constructor(private readonly requestService: WorkoutRequestService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new workout request has been successfully created',
  })
  @ApiBody({ type: CreateWorkoutRequestDto })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateWorkoutRequestDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.requestService.createWorkoutRequest(dto, tokenPayload);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The workout request status has been successfully updated',
  })
  @ApiBody({ type: UpdateRequestStatusDto })
  @Patch('/')
  public async update(
    @Body() dto: UpdateRequestStatusDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.requestService.updateRequestStatus(dto, tokenPayload.sub);
  }
}
