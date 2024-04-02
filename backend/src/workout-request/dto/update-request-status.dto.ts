import { DtoValidationMessage } from 'src/shared/messages';
import { RequestStatus } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';

export class UpdateRequestStatusDto {
  @ApiProperty({
    description: 'Request id',
    example: '660306ae5cdc417b17500eec',
  })
  @IsMongoId()
  public requestId: string;

  @ApiProperty({
    description: 'Request status',
    example: 'принят',
  })
  @IsEnum(RequestStatus, {
    message: DtoValidationMessage.requestStatus.invalidFormat,
  })
  public status: RequestStatus;
}
