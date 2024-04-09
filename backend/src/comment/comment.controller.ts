import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRdo, CommentsWithPaginationRdo } from './rdo';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { CreateCommentDto } from './dto';
import { RequestWithTokenPayload } from 'src/shared/requests';
import { BaseQuery } from 'src/shared/query/base.query';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    type: CommentsWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Comments list',
  })
  @ApiQuery({ type: BaseQuery })
  @Get('/:workoutId')
  public async index(
    @Param('workoutId', MongoIdValidationPipe) workoutId: string,
    @Query() query: BaseQuery,
  ) {
    return this.commentService.getComments(workoutId, query);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created',
  })
  @ApiBody({ type: CreateCommentDto })
  @Role(UserRole.Default)
  @UseGuards(RoleGuard)
  @Post('/')
  public async create(
    @Body() dto: CreateCommentDto,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    return this.commentService.createComment(dto, tokenPayload.sub);
  }
}
