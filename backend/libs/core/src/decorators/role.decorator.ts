import { SetMetadata } from '@nestjs/common';

export const Role = (arg: string) => SetMetadata('role', arg);
