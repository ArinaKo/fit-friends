import { DtoValidationMessage } from 'src/shared/messages';
import { RequestStatus } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateRequestStatusDto {
  @ApiProperty({
    description: 'Request status',
    example: 'принят',
  })
  @IsEnum(RequestStatus, {
    message: DtoValidationMessage.requestStatus.invalidFormat,
  })
  public status: RequestStatus;
}
