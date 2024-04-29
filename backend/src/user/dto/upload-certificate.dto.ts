import { ApiProperty } from '@nestjs/swagger';

export class UploadCertificateDto {
  @ApiProperty({
    description: 'New certificate',
  })
  public certificate: File;
}
