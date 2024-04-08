import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { transformValidationErrors } from '@app/helpers';

type DtoListing = Record<string, any>;

@Injectable()
export class UserDtoValidationPipe implements PipeTransform {
  private dtoListing: DtoListing;

  constructor(listing: DtoListing) {
    this.dtoListing = listing;
  }

  public async transform(value: any, { type }: ArgumentMetadata): Promise<any> {
    if (type === 'body') {
      const userRole = value.role;
      const user = plainToInstance(this.dtoListing[userRole], value, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
      const classAValidationErrors = await validate(user);
      if (classAValidationErrors.length > 0) {
        throw new BadRequestException(
          transformValidationErrors(classAValidationErrors),
        );
      }
      return user;
    }
    return value;
  }
}
