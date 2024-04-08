import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BasePaginationRdo {
  @ApiProperty({
    description: 'Total count of pages',
    example: '4',
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Total count of items',
    example: '40',
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Current page',
    example: '2',
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Items count per page',
    example: '10',
  })
  @Expose()
  public itemsPerPage: number;
}
