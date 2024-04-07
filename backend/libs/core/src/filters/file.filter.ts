import { UnsupportedMediaTypeException } from '@nestjs/common';

export function FileFilter(mimetypes: string[], maxSize?: number) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    console.log(file.originalname);
    if (!mimetypes.includes(file.mimetype)) {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
    if (maxSize && file.size > maxSize) {
      callback(
        new UnsupportedMediaTypeException(`Max file size is ${maxSize}`),
        false,
      );
    }
    callback(null, true);
  };
}
