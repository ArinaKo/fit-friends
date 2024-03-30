import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DecreaseBalanceDto {
  @ApiProperty({
    description: 'Workout id',
    example: '660306ae5cdc417b17500eec',
  })
  @IsMongoId()
  public workoutId: string;
}
