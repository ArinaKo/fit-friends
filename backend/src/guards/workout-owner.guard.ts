import {
  ExecutionContext,
  Injectable,
  CanActivate,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class WorkoutOwnerGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => WorkoutService))
    private readonly workoutService: WorkoutService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const workoutId = request.params.workoutId;
    const userId = request.tokenPayload.sub;

    const coachId = await this.workoutService.getCoachId(workoutId);

    return userId === coachId;
  }
}
