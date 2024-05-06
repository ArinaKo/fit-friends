export enum WorkoutCardType {
  CoachWorkouts = 'coach-workouts',
  WorkoutOrders = 'workout-orders',
  WorkoutBalance = 'workout-balance'
}

type WorkoutCardTypeDiff = {
  listItemStyleClass: string;
  withButtons: boolean;
};

type WorkoutCardTypeDiffs = {
  [type: string]: WorkoutCardTypeDiff;
};

export const WorkoutCardTypeDiffs: WorkoutCardTypeDiffs = {
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
};
