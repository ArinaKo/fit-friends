import { NameSpace, UserRole } from '../../const';
import { Comment, FileData, State, User } from '../../types';

export const getWorkoutId = (state: State): string =>
  state[NameSpace.WorkoutInfo].id;

export const getWorkoutTitle = (state: State): string =>
  state[NameSpace.WorkoutInfo].title;

export const getWorkoutType = (state: State): string =>
  state[NameSpace.WorkoutInfo].type;

export const getWorkoutDuration = (state: State): string =>
  state[NameSpace.WorkoutInfo].duration;

export const getWorkoutCalories = (state: State): number =>
  state[NameSpace.WorkoutInfo].calories;

export const getWorkoutPrice = (state: State): string =>
  state[NameSpace.WorkoutInfo].price;

export const getWorkoutRating = (state: State): number =>
  state[NameSpace.WorkoutInfo].rating;

export const getWorkoutUserSex = (state: State): string =>
  state[NameSpace.WorkoutInfo].userSex;

export const getWorkoutDescription = (state: State): string =>
  state[NameSpace.WorkoutInfo].description;

export const getWorkoutVideo = (state: State): FileData | undefined =>
  state[NameSpace.WorkoutInfo].video;

export const getWorkoutImage = (state: State): string =>
  state[NameSpace.WorkoutInfo].backgroundImage;

export const getWorkoutCoach = (state: State): User | undefined =>
  state[NameSpace.WorkoutInfo].coach;

export const getWorkoutSpecialFlag = (state: State): boolean =>
  state[NameSpace.WorkoutInfo].isSpecial;

export const getWorkoutComments = (state: State): Comment[] =>
  state[NameSpace.WorkoutInfo].comments;

export const isWorkoutBalanceExists = (state: State): boolean =>
  state[NameSpace.WorkoutInfo].balance !== null;

export const isWorkoutBalanceActive = (state: State): boolean =>
  state[NameSpace.WorkoutInfo].balance !== null &&
  state[NameSpace.WorkoutInfo].balance > 0;

export const isWorkoutInfoLoading = (state: State): boolean =>
  state[NameSpace.WorkoutInfo].isDataLoading;

export const isWorkoutInfoEditing = (state: State): boolean =>
  state[NameSpace.WorkoutInfo].isDataEditing;

export const isUserHaveAccessToWorkout = (state: State): boolean =>
  state[NameSpace.AppData].userRole === UserRole.Default ||
  state[NameSpace.WorkoutInfo].coachId === state[NameSpace.AppData].userId;

export const isCurrentWorkoutActive = (state: State): boolean =>
  state[NameSpace.WorkoutInfo].id === state[NameSpace.AppData].activeWorkout;
