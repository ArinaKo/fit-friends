import { NameSpace, UserRole } from '../../const';
import { Comment, FileData, State, User } from '../../types';

export const getWorkoutId = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].id;

export const getWorkoutTitle = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].title;

export const getWorkoutType = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].type;

export const getWorkoutDuration = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].duration;

export const getWorkoutCalories = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): number => state[NameSpace.WorkoutInfo].calories;

export const getWorkoutPrice = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].price;

export const getWorkoutRating = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): number => state[NameSpace.WorkoutInfo].rating;

export const getWorkoutUserSex = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].userSex;

export const getWorkoutDescription = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].description;

export const getWorkoutVideo = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): FileData | undefined => state[NameSpace.WorkoutInfo].video;

export const getWorkoutImage = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): string => state[NameSpace.WorkoutInfo].backgroundImage;

export const getWorkoutCoach = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): User | undefined => state[NameSpace.WorkoutInfo].coach;

export const getWorkoutSpecialFlag = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): boolean => state[NameSpace.WorkoutInfo].isSpecial;

export const getWorkoutComments = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): Comment[] => state[NameSpace.WorkoutInfo].comments;

export const isWorkoutBalanceExists = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): boolean => state[NameSpace.WorkoutInfo].balance !== null;

export const isWorkoutBalanceActive = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): boolean =>
  state[NameSpace.WorkoutInfo].balance !== null &&
  state[NameSpace.WorkoutInfo].balance > 0;

export const isWorkoutInfoLoading = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): boolean => state[NameSpace.WorkoutInfo].isDataLoading;

export const isWorkoutInfoEditing = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): boolean => state[NameSpace.WorkoutInfo].isDataEditing;

export const isWorkoutInfoHasError = (
  state: Pick<State, NameSpace.WorkoutInfo>,
): boolean => state[NameSpace.WorkoutInfo].hasError;

export const isUserHaveAccessToWorkout = (
  state: Pick<State, NameSpace.WorkoutInfo> & Pick<State, NameSpace.AppData>,
): boolean =>
  state[NameSpace.AppData].userRole === UserRole.Default ||
  state[NameSpace.WorkoutInfo].coachId === state[NameSpace.AppData].userId;

export const isCurrentWorkoutActive = (
  state: Pick<State, NameSpace.WorkoutInfo> & Pick<State, NameSpace.AppData>,
): boolean =>
  state[NameSpace.WorkoutInfo].id === state[NameSpace.AppData].activeWorkout;
