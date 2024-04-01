import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateWorkoutRequestDto {
  @ApiProperty({
    description: 'Request to user id',
    example: '660306ae5cdc417b17500eec',
  })
  @IsMongoId()
  public userId: string;
}
