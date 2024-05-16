export enum WorkoutsListType {
  CoachWorkouts = 'coach-workouts',
  WorkoutsCatalog = 'workouts-catalog',
}

type WorkoutsListTypeDiff = {
  styleClass: string;
  cardStyleClass: string;
};

type WorkoutsListTypeDiffs = {
  [type: string]: WorkoutsListTypeDiff;
};

export const WorkoutsListTypeDiffs: WorkoutsListTypeDiffs = {
  [WorkoutsListType.CoachWorkouts]: {
    styleClass: 'my-trainings',
    cardStyleClass: 'my-trainings__item',
  },
  [WorkoutsListType.WorkoutsCatalog]: {
    styleClass: 'training-catalog',
    cardStyleClass: 'training-catalog__item',
  },
};
