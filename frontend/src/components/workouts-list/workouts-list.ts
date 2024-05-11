import { WorkoutCardType } from '../workout-card/workout-card';

export enum WorkoutsListType {
  CoachWorkouts = 'coach-workouts',
  WorkoutsCatalog = 'workouts-catalog',
}

type WorkoutsListTypeDiff = {
  styleClass: string;
  cardType: WorkoutCardType;
};

type WorkoutsListTypeDiffs = {
  [type: string]: WorkoutsListTypeDiff;
};

export const WorkoutsListTypeDiffs: WorkoutsListTypeDiffs = {
  [WorkoutsListType.CoachWorkouts]: {
    styleClass: 'my-trainings',
    cardType: WorkoutCardType.CoachWorkouts,
  },
  [WorkoutsListType.WorkoutsCatalog]: {
    styleClass: 'training-catalog',
    cardType: WorkoutCardType.CatalogWorkout,
  },
};
