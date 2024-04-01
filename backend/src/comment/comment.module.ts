import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';
import { WorkoutModule } from 'src/workout/workout.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
    WorkoutModule,
  ],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
