import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DecreaseBalanceDto {
  @ApiProperty({
    description: 'Workout id',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  public workoutId: string;
}
