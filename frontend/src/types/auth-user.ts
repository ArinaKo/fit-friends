import { FileData } from './file-data';
import { FullUser } from './full-user';

export type AuthUser = FullUser & {
  caloriesToLose?: number;
  caloriesPerDay?: number;
  certificates?: FileData[];
};
