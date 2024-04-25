import { STATIC_URL } from '../const';
import { FileData } from '../types';

export const getFileUrl = (file: FileData): string =>
  `${STATIC_URL}/${file.subDirectory}/${file.hashName}`;
