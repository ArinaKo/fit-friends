export enum WorkoutsListType {
  CoachWorkouts = 'coach-workouts',
  WorkoutsCatalog = 'workouts-catalog',
}

type WorkoutsListTypeDiff = {
  listStyleClass: string;
};

type WorkoutsListTypeDiffs = {
  [type: string]: WorkoutsListTypeDiff;
};

export const WorkoutsListTypeDiffs: WorkoutsListTypeDiffs = {
  [WorkoutsListType.CoachWorkouts]: {
    listStyleClass: 'my-trainings',
  },
  [WorkoutsListType.WorkoutsCatalog]: {
    listStyleClass: 'training-catalog',
  },
};
