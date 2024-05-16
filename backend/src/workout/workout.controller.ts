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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';
import { FullWorkoutRdo, WorkoutRdo, WorkoutsWithPaginationRdo } from './rdo';
import {
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { FileFilter, MongoIdValidationPipe, ParseFile, Role } from '@app/core';
import { RoleGuard, WorkoutOwnerGuard } from 'src/shared/guards';
import { UserRole } from '@app/types';
import { CoachWorkoutsQuery, WorkoutsQuery } from './query';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoFile } from 'src/shared/const';

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
    type: FullWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new workout has been successfully created',
  })
  @ApiBody({ type: CreateWorkoutDto })
  @ApiConsumes('multipart/form-data')
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Post('/')
  @UseInterceptors(
    FileInterceptor('video', {
      fileFilter: FileFilter(VideoFile.MimeTypes),
    }),
  )
  public async create(
    @Body() dto: CreateWorkoutDto,
    @UploadedFile(ParseFile) video: Express.Multer.File,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.workoutService.createWorkout(dto, tokenPayload.sub, video);
  }

  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'Special workouts list',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @ApiQuery({ type: WorkoutsQuery })
  @Get('/special')
  public async getSpecial() {
    return this.workoutService.getSpecialWorkouts();
  }

  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'Popular workouts list',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @ApiQuery({ type: WorkoutsQuery })
  @Get('/popular')
  public async getPopular() {
    return this.workoutService.getPopularWorkouts();
  }

  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'Workouts list for a user',
  })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @ApiQuery({ type: WorkoutsQuery })
  @Get('/for-user')
  public async getForUser(@Req() { tokenPayload }: RequestWithTokenPayload) {
    return this.workoutService.getWorkoutsForUser(tokenPayload.sub);
  }

  @ApiResponse({
    type: WorkoutsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Coach workouts list',
  })
  @ApiQuery({ type: CoachWorkoutsQuery })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Get('/my-workouts')
  public async indexByCoach(
    @Query() query: CoachWorkoutsQuery,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.workoutService.getCoachWorkouts(tokenPayload.sub, query);
  }

  @ApiResponse({
    type: WorkoutsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Workouts list from a coach',
  })
  @Get('/from-coach/:coachId')
  public async coachWorkouts(
    @Param('coachId', MongoIdValidationPipe) coachId: string,
  ) {
    console.log('hi');
    return this.workoutService.getWorkoutsByCoach(coachId);
  }

  @ApiResponse({
    type: FullWorkoutRdo,
    status: HttpStatus.OK,
    description: 'The workout has been successfully updated',
  })
  @ApiBody({ type: UpdateWorkoutDto })
  @UseGuards(WorkoutOwnerGuard)
  @Patch('/update/:workoutId')
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
