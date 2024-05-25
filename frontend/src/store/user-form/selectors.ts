import { NameSpace, UserRole, WorkoutType } from '../../const';
import { State } from '../../types';

export const getUserFormEmail = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].email;

export const getUserFormPassword = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].password;

export const getUserFormName = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].name;

export const getUserFormDateOfBirth = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].dateOfBirth;

export const getUserFormSex = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].sex;

export const getUserFormRole = (
  state: Pick<State, NameSpace.UserForm>,
): UserRole => state[NameSpace.UserForm].role;

export const getUserFormLocation = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].location;

export const getUserFormAvatar = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].avatar;

export const getUserFormLevel = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].level;

export const getUserFormStatus = (
  state: Pick<State, NameSpace.UserForm>,
): boolean => state[NameSpace.UserForm].status;

export const getUserFormWorkoutTypes = (
  state: Pick<State, NameSpace.UserForm>,
): WorkoutType[] => state[NameSpace.UserForm].workoutTypes;

export const getUserFormTimeForWorkout = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].timeForWorkout;

export const getUserFormCaloriesToLose = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].caloriesToLose;

export const getUserFormCaloriesPerDay = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].caloriesPerDay;

export const getUserFormAchievements = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].achievements;

export const getUserFormDescription = (
  state: Pick<State, NameSpace.UserForm>,
): string => state[NameSpace.UserForm].description;

export const getUserFormCertificatesAmount = (
  state: Pick<State, NameSpace.UserForm>,
): number => state[NameSpace.UserForm].certificatesAmount;

export const getUserFormEmailError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.email;

export const getUserFormPasswordError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.password;

export const getUserFormNameError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.name;

export const getUserFormSexError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.sex;

export const getUserFormDateOfBirthError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.dateOfBirth;

export const getUserFormLocationError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.location;

export const getUserFormAvatarError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.avatar;

export const getUserFormLevelError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.level;

export const getUserFormWorkoutTypesError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.workoutTypes;

export const getUserFormCaloriesToLoseError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.caloriesToLose;

export const getUserFormCaloriesPerDayError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.caloriesPerDay;

export const getUserFormCertificatesError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.certificatesAmount;

export const getUserFormAchievementsError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.achievements;

export const getUserFormDescriptionError = (
  state: Pick<State, NameSpace.UserForm>,
): string | undefined => state[NameSpace.UserForm].validationErrors.description;

export const isUserFormHaveErrors = (
  state: Pick<State, NameSpace.UserForm>,
): boolean =>
  Object.values(state[NameSpace.UserForm].validationErrors).some(
    (error) => error !== undefined,
  );

export const isUserFormDataSending = (
  state: Pick<State, NameSpace.UserForm>,
): boolean => state[NameSpace.UserForm].isSending;
