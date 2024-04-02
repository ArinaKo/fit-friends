export const NOTIFICATIONS_LIMIT = 5;

export const NotificationText = {
  getNewFriendMessage: (name: string) => `${name} добавил(а) вас в друзья`,
  getWorkoutRequestMessage: (name: string) =>
    `${name} приглашает вас на совместную тренировку`,
  getCoachWorkoutRequestMessage: (name: string) =>
    `${name} запрашивает персональную тренировку`,
};
