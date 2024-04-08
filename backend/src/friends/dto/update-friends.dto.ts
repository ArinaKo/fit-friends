import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdateFriendsDto {
  @ApiProperty({
    description: 'Friend id',
    example: '660306ae5cdc417b17500eec',
  })
  @IsMongoId()
  friendId: string;
}
