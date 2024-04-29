import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteCertificateDto {
  @ApiProperty({
    description: 'Old certificate id',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  public certificateId: string;
}
