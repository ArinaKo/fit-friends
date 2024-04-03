import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileRdo {
  @ApiProperty({
    description: 'File id',
    example: '660306ae5cdc417b17500345',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'File original name',
    example: 'image.png',
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: 'File hash name',
    example: '3822bc22-3f95-4fac-ac90-4d942dcd0f84.png',
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    description: 'File sub directory',
    example: '2024/04',
  })
  @Expose()
  public subDirectory: string;

  @ApiProperty({
    description: 'File mimetype',
    example: 'image/png',
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: 'File size',
    example: '1048576',
  })
  @Expose()
  public size: number;
}
