import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileVaultModule } from 'src/file-vault/file-vault.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    FileVaultModule,
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository, UserService],
})
export class UserModule {}
