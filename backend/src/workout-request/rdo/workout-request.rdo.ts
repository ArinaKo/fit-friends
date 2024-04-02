import { RequestStatus } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WorkoutRequestRdo {
  @ApiProperty({
    description: 'Request id',
    example: '660306ae5cdc417b17500eec',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Request status',
    example: 'принят',
  })
  @Expose()
  public status: RequestStatus;
}
