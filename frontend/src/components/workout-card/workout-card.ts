export enum WorkoutCardType {
  CatalogWorkout = 'catalog-workout',
  CoachWorkouts = 'coach-workouts',
  WorkoutOrders = 'workout-orders',
  WorkoutBalance = 'workout-balance',
  UserInfoWorkout = 'user-info-workout',
}

type WorkoutCardTypeDiff = {
  listItemStyleClass: string;
  withButtons: boolean;
};

type WorkoutCardTypeDiffs = {
  [type: string]: WorkoutCardTypeDiff;
};

export const WorkoutCardTypeDiffs: WorkoutCardTypeDiffs = {
  [WorkoutCardType.CatalogWorkout]: {
    listItemStyleClass: 'training-catalog__item',
    withButtons: true,
  },
  [WorkoutCardType.CoachWorkouts]: {
    listItemStyleClass: 'my-trainings__item',
    withButtons: true,
  },
  [WorkoutCardType.WorkoutOrders]: {
    listItemStyleClass: 'my-orders__item',
    withButtons: false,
  },
  [WorkoutCardType.WorkoutBalance]: {
    listItemStyleClass: 'my-purchases__item',
    withButtons: true,
  },
  [WorkoutCardType.UserInfoWorkout]: {
    listItemStyleClass: 'user-card__training-item',
    withButtons: true,
  },
};
