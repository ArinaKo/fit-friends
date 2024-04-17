import { UserRole } from './user';

export const RoleInputLabel = {
  [UserRole.Default]: 'Я хочу тренироваться',
  [UserRole.Coach]: 'Я хочу тренировать',
} as const;
