export enum WorkoutsFilterType {
  CoachWorkouts = 'coach-workouts',
  WorkoutsCatalog = 'workouts-catalog',
}

type WorkoutsFilterTypeDiff = {
  styleClass: string;
};

type WorkoutsFilterTypeDiffs = {
  [type: string]: WorkoutsFilterTypeDiff;
};

export const WorkoutsFilterTypeDiffs: WorkoutsFilterTypeDiffs = {
  [WorkoutsFilterType.CoachWorkouts]: {
    styleClass: 'my-trainings',
  },
  [WorkoutsFilterType.WorkoutsCatalog]: {
    styleClass: 'gym-catalog',
  },
};
