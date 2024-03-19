import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@app/config';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    AppConfigModule, 
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
