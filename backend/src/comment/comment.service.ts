import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { fillDto } from '@app/helpers';
import { CreateCommentDto } from './dto';
import { CommentRdo } from './rdo';
import { CommentEntity } from './comment.entity';
import { WorkoutService } from 'src/workout/workout.service';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository, private readonly workoutService: WorkoutService) {}

  public async createComment(
    dto: CreateCommentDto,
    userId: string,
  ): Promise<CommentRdo> {
    await this.workoutService.getWorkoutEntity(dto.workoutId);
    
    const newComment = CommentEntity.fromObject(Object.assign(dto, { userId }));
    await this.commentRepository.save(newComment);

    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
