export enum WorkoutCardType {
  CoachWorkouts = 'coach-workouts',
  WorkoutOrders = 'workout-orders',
}

type WorkoutCardTypeDiff = {
  listItemStyleClass: string;
};

type WorkoutCardTypeDiffs = {
  [type: string]: WorkoutCardTypeDiff;
};

export const WorkoutCardTypeDiffs: WorkoutCardTypeDiffs = {
  [WorkoutCardType.CoachWorkouts]: {
    listItemStyleClass: 'my-trainings__item',
  },
  [WorkoutCardType.WorkoutOrders]: {
    listItemStyleClass: 'my-orders__item',
  },
};
