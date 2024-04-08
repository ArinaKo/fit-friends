import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateFriendsDto {
  @ApiProperty({
    description: 'Friend id',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  friendId: string;
}
