import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@app/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AppConfigModule, 
    MongooseModule.forRootAsync(getMongooseOptions()),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
