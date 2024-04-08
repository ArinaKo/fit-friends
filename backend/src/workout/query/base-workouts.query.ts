import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQuery } from 'src/shared/query/base.query';
import { CaloriesValue, PriceValue, RatingValue } from 'src/shared/const';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseWorkoutsQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Minimum price',
    example: '100',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(PriceValue.Min)
  @IsOptional()
  public minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
    example: '7000',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(PriceValue.Min)
  @IsOptional()
  public maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Minimum calories lose',
    example: '1000',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(CaloriesValue.Min)
  @Max(CaloriesValue.Max)
  @IsOptional()
  public minCalories?: number;

  @ApiPropertyOptional({
    description: 'Maximum calories lose',
    example: '4000',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(CaloriesValue.Min)
  @Max(CaloriesValue.Max)
  @IsOptional()
  public maxCalories?: number;

  @ApiPropertyOptional({
    description: 'Minimum rating',
    example: '1',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(RatingValue.Min)
  @Max(RatingValue.Max)
  @IsOptional()
  public minRating?: number;

  @ApiPropertyOptional({
    description: 'Maximum rating',
    example: '5',
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(RatingValue.Min)
  @Max(RatingValue.Max)
  @IsOptional()
  public maxRating?: number;
}
