export const EmailSubject = {
  NewSubscription: 'Подписка на рассылку оформлена',
  NewWorkout: 'Новая тренировка',
} as const;

export const EmailTemplates = {
  NewSubscription: './new-subscription',
  NewWorkout: './new-workout',
} as const;
