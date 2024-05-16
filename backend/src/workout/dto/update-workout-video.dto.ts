import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkoutVideoDto {
  @ApiProperty({
    description: 'Workout video',
  })
  public video: Express.Multer.File;
}
