import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRdo } from './rdo';
import { ApiResponse } from '@nestjs/swagger';
import { MongoIdValidationPipe, Role } from '@app/core';
import { UserRole } from '@app/types';
import { RoleGuard } from 'src/shared/guards';
import { CreateCommentDto } from './dto';
import { RequestWithTokenPayload } from 'src/shared/requests';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatus.OK,
    description: 'Comments list',
  })
  @Get('/:workoutId')
  public async index(
    @Param('workoutId', MongoIdValidationPipe) workoutId: string,
  ) {
    return this.commentService.getComments(workoutId);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created',
  })
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
