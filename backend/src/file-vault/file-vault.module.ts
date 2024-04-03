import { Module } from '@nestjs/common';
import { FileVaultService } from './file-vault.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { FileVaultRepository } from './file-vault.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(
          'application.uploadDirectory',
        );
        const serveRoot = configService.get<string>(
          'application.filesServePath',
        );
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
  providers: [FileVaultRepository, FileVaultService],
})
export class FileVaultModule {}
