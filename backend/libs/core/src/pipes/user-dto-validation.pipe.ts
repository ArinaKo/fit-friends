import { ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { reduceValidationErrors } from '@app/helpers';
import { CreateUserDto } from 'src/users/dto';
import { UserRole } from '@app/types';

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
      const post = plainToInstance(this.dtoListing[userRole], value);
      const classAValidationErrors = await validate(post);
      if (classAValidationErrors.length > 0) {
        throw new BadRequestException(
          reduceValidationErrors(classAValidationErrors)
        );
      }
    }
    return value;
  }
}
