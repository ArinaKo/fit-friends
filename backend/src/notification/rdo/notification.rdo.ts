import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationRdo {
  @ApiProperty({
    description: 'Notification id',
    example: '660306ae5cdc417b17500345',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Notification text',
    example: 'Keks добавил(а) вас в друзья',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Notification date',
    example: '2024-05-12T17:18:56.958Z',
  })
  @Expose()
  public date: Date;
}
