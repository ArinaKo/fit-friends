import { Expose } from 'class-transformer';
import { BasePaginationRdo } from '@app/core';
import { CommentRdo } from './comment.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CommentsWithPaginationRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Comments list',
    type: [CommentRdo],
  })
  @Expose()
  public comments: CommentRdo[];
}
