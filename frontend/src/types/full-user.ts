import { FileData } from './file-data';
import { User } from './user';

export type FullUser = User & {
  description: string;
  backgroundImage: FileData;
  certificates?: FileData[];
};
