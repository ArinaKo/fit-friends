import { VideoFile } from '../const';

export const UserMessage = {
  Exists: 'User with this email exists',
  NotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
};

export const FileMessage = {
  UploadedVideoType: `Uploaded file type is not matching: ${VideoFile.MimeTypes.join(', ')}`,
};
