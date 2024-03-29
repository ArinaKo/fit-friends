import { DtoValidationMessage } from "@app/messages";
import { OrderType, PaymentType } from "@app/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, Max, Min } from "class-validator";
import { OrderCountValue, PriceValue } from "src/const";

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
  })
  @IsEnum(OrderType, { message: DtoValidationMessage.orderType.invalidFormat })
  public type: OrderType;

  @ApiProperty({
    description: 'Workout id',
    example: '660306ae5cdc417b17500eec',
  })
  @IsMongoId()
  public workoutId: string;

  @ApiProperty({
    description: 'Ordered workout`s count',
    example: '2',
  })
  @IsNumber()
  @Min(OrderCountValue.Min, { message: DtoValidationMessage.orderCount.value })
  @Max(OrderCountValue.Max, { message: DtoValidationMessage.orderCount.value })
  public count: number;

  @ApiProperty({
    description: 'Payment type',
    example: 'visa',
  })
  @IsEnum(PaymentType, { message: DtoValidationMessage.paymentType.invalidFormat })
  public paymentType: PaymentType;
}
