import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQuery } from 'src/shared/query/base.query';
import { CaloriesValue, PriceValue, RatingValue } from 'src/shared/const';

export class BaseWorkoutsQuery extends BaseQuery {
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(PriceValue.Min)
  @IsOptional()
  public minPrice?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(PriceValue.Min)
  @IsOptional()
  public maxPrice?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(CaloriesValue.Min)
  @Max(CaloriesValue.Max)
  @IsOptional()
  public minCalories?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(CaloriesValue.Min)
  @Max(CaloriesValue.Max)
  @IsOptional()
  public maxCalories?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(RatingValue.Min)
  @Max(RatingValue.Max)
  @IsOptional()
  public minRating?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(RatingValue.Min)
  @Max(RatingValue.Max)
  @IsOptional()
  public maxRating?: number;
}
