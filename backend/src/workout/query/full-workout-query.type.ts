import { CoachWorkoutsQuery } from './coach-workouts.query';
import { WorkoutsQuery } from './workouts.query';

export type FullWorkoutQuery = WorkoutsQuery & CoachWorkoutsQuery;
