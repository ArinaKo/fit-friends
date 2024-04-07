import { Module } from '@nestjs/common';
import { FileVaultService } from './file-vault.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { FileVaultRepository } from './file-vault.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileVaultController } from './file-vault.controller';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('app.uploadDirectory');
        const serveRoot = configService.get<string>('app.filesServePath');
        return [
          {
            rootPath,
            serveRoot,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  controllers: [FileVaultController],
  providers: [FileVaultRepository, FileVaultService],
  exports: [FileVaultService, FileVaultRepository],
})
export class FileVaultModule {}
