import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { fillDto } from '@app/helpers';
import { CreateCommentDto } from './dto';
import { CommentRdo, CommentsWithPaginationRdo } from './rdo';
import { CommentEntity } from './comment.entity';
import { WorkoutService } from 'src/workout/workout.service';
import { BaseQuery } from 'src/shared/query/base.query';
import { UserRdo } from 'src/user/rdo';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly workoutService: WorkoutService,
  ) {}

  public async createComment(
    dto: CreateCommentDto,
    userId: string,
  ): Promise<CommentRdo> {
    await this.workoutService.getWorkoutEntity(dto.workoutId);

    const newComment = CommentEntity.fromObject(Object.assign(dto, { userId }));
    await this.commentRepository.save(newComment);

    await this.workoutService.updateWorkoutRating(dto.workoutId);

    return fillDto(CommentRdo, newComment.toPOJO());
  }

  public async getComments(
    workoutId: string,
    query?: BaseQuery,
  ): Promise<CommentsWithPaginationRdo> {
    const commentsWithPagination = await this.commentRepository.find(workoutId);
    return fillDto(CommentsWithPaginationRdo, {
      ...commentsWithPagination,
      comments: commentsWithPagination.entities.map((comment) => ({
        ...comment,
        user: fillDto( UserRdo, comment.user!.toPOJO()),
      })),
    });
  }
}
