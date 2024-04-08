import { DtoValidationMessage } from 'src/shared/messages';
import { OrderType, PaymentType } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsInt, Max, Min } from 'class-validator';
import { OrderCountValue } from 'src/shared/const';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(OrderType, { message: DtoValidationMessage.orderType.invalidFormat })
  public type: OrderType;

  @ApiProperty({
    description: 'Workout id',
    example: '660306ae5cdc417b17500eec',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId()
  public workoutId: string;

  @ApiProperty({
    description: 'Ordered workout`s count',
    example: '2',
  })
  @IsInt()
  @Min(OrderCountValue.Min, { message: DtoValidationMessage.orderCount.value })
  @Max(OrderCountValue.Max, { message: DtoValidationMessage.orderCount.value })
  public count: number;

  @ApiProperty({
    description: 'Payment type',
    example: 'visa',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(PaymentType, {
    message: DtoValidationMessage.paymentType.invalidFormat,
  })
  public paymentType: PaymentType;
}
