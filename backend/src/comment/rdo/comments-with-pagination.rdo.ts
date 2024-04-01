import { Expose } from 'class-transformer';
import { BasePaginationRdo } from '@app/core';
import { CommentRdo } from './comment.rdo';

export class CommentsWithPaginationRdo extends BasePaginationRdo {
  @Expose()
  public comments: CommentRdo[];
}
