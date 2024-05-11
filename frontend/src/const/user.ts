export const WORKOUT_TYPE_MAX_AMOUNT = 3;

export enum UserRole {
  Coach = 'тренер',
  Default = 'пользователь',
}

export enum UserSex {
  Male = 'мужской',
  Female = 'женский',
  Other = 'неважно',
}

export enum UserLevel {
  Beginner = 'новичок',
  Amateur = 'любитель',
  Pro = 'профессионал',
}

export enum PasswordLength {
  Min = 6,
  Max = 12,
}

export enum NameLength {
  Min = 1,
  Max = 15,
}

export enum CaloriesValue {
  Min = 1000,
  Max = 5000,
}

export enum CoachAchievementsLength {
  Min = 10,
  Max = 140,
}

export enum UserDescriptionLength {
  Min = 10,
  Max = 140,
}

export enum RequestStatus {
  Default = 'на рассмотрении',
  Rejected = 'отклонён',
  Accepted = 'принят',
}

export const RequestStatusText = {
  ForUser: 'Запрос на совместную тренировку',
  ForCoach: 'Запрос на персональную тренировку',
} as const;

export enum UserStatus {
  Ready = 'Готов к тренировке',
  NotReady = 'Не готов к тренировке',
}
