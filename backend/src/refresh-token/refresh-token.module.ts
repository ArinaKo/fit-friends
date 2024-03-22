import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';
import { RefreshTokenRepository } from './refresh-token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshTokenModel.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [RefreshTokenRepository],
})
export class RefreshTokenModule {}
