import { FileEntity } from 'src/file-vault/file.entity';
import { FilesAmount } from '../mock.const';

export function generateAvatarsEntities(): FileEntity[] {
  return Array.from({ length: FilesAmount.Avatars }).map((_, index) =>
    FileEntity.fromObject({
      originalName: `avatar-${index + 1}.jpg`,
      subDirectory: 'mocks',
      size: 14,
      mimetype: 'image/png',
      hashName: `avatar-${index + 1}.jpg`,
      path: `${process.env.UPLOAD_DIRECTORY_PATH}/mocks/avatar-${index + 1}.jpg`,
    }),
  );
}

export function generateCertificatesEntities(): FileEntity[] {
  return Array.from({ length: FilesAmount.Certificates }).map((_, index) =>
    FileEntity.fromObject({
      originalName: `certificate-${index + 1}.pdf`,
      subDirectory: 'mocks',
      size: 100,
      mimetype: 'application/pdf',
      hashName: `certificate-${index + 1}.pdf`,
      path: `${process.env.UPLOAD_DIRECTORY_PATH}/mocks/certificate-${index + 1}.pdf`,
    }),
  );
}

export function generateVideosEntities(): FileEntity[] {
  return [
    {
      originalName: 'video.mp4',
      subDirectory: 'mocks',
      size: 14,
      mimetype: 'video/mp4',
      hashName: 'video.mp4',
      path: `${process.env.UPLOAD_DIRECTORY_PATH}/mocks/video.mp4`,
    },
    {
      originalName: 'video.mov',
      subDirectory: 'mocks',
      size: 14,
      mimetype: 'video/mov',
      hashName: 'video.mov',
      path: `${process.env.UPLOAD_DIRECTORY_PATH}/mocks/video.mov`,
    },
  ].map((file) => FileEntity.fromObject(file));
}
