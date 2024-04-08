import { DtoValidationMessage } from 'src/shared/messages';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min, Max, IsMongoId } from 'class-validator';
import { CommentTextLength, RatingValue } from 'src/shared/const';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Workout id',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  public workoutId: string;

  @ApiProperty({
    description: 'Workout rating',
    example: '4',
  })
  @IsInt()
  @Min(RatingValue.Min, { message: DtoValidationMessage.rating.value })
  @Max(RatingValue.Max, { message: DtoValidationMessage.rating.value })
  public rating: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Хорошая тренировка, понравилось',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(CommentTextLength.Min, CommentTextLength.Max, {
    message: DtoValidationMessage.userDescription.length,
  })
  public text: string;
}
