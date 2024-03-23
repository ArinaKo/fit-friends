import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule, getMongooseOptions } from '@app/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    AppConfigModule, 
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}
