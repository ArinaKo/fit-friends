import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';

@Module({
  imports: [AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
