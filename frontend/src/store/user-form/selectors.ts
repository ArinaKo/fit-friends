import { NameSpace, UserRole, WorkoutType } from '../../const';
import { State } from '../../types';

export const getUserFormEmail = (state: State): string =>
  state[NameSpace.UserForm].email;

export const getUserFormPassword = (state: State): string =>
  state[NameSpace.UserForm].password;

export const getUserFormName = (state: State): string =>
  state[NameSpace.UserForm].name;

export const getUserFormDateOfBirth = (state: State): string =>
  state[NameSpace.UserForm].dateOfBirth;

export const getUserFormSex = (state: State): string =>
  state[NameSpace.UserForm].sex;

export const getUserFormRole = (state: State): UserRole =>
  state[NameSpace.UserForm].role;

export const getUserFormLocation = (state: State): string | undefined =>
  state[NameSpace.UserForm].location;

export const getUserFormAvatar = (state: State): string | undefined =>
  state[NameSpace.UserForm].avatar;

export const getUserFormLevel = (state: State): string =>
  state[NameSpace.UserForm].level;

export const getUserFormStatus = (state: State): boolean =>
  state[NameSpace.UserForm].status;

export const getUserFormWorkoutTypes = (state: State): WorkoutType[] =>
  state[NameSpace.UserForm].workoutTypes;

export const getUserFormTimeForWorkout = (state: State): string =>
  state[NameSpace.UserForm].timeForWorkout;

export const getUserFormCaloriesToLose = (state: State): string =>
  state[NameSpace.UserForm].caloriesToLose;

export const getUserFormCaloriesPerDay = (state: State): string =>
  state[NameSpace.UserForm].caloriesPerDay;

export const getUserFormAchievements = (state: State): string =>
  state[NameSpace.UserForm].achievements;

export const getUserFormDescription = (state: State): string =>
  state[NameSpace.UserForm].description;

export const getUserFormCertificatesAmount = (state: State): number =>
  state[NameSpace.UserForm].certificatesAmount;

export const getUserFormEmailError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.email;

export const getUserFormPasswordError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.password;

export const getUserFormNameError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.name;

export const getUserFormSexError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.sex;

export const getUserFormDateOfBirthError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.dateOfBirth;

export const getUserFormLocationError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.location;

export const getUserFormAvatarError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.avatar;

export const getUserFormLevelError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.level;

export const getUserFormWorkoutTypesError = (
  state: State,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.workoutTypes;

export const getUserFormCaloriesToLoseError = (
  state: State,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.caloriesToLose;

export const getUserFormCaloriesPerDayError = (
  state: State,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.caloriesPerDay;

export const getUserFormCertificatesError = (
  state: State,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.certificatesAmount;

export const getUserFormAchievementsError = (
  state: State,
): string | undefined =>
  state[NameSpace.UserForm].validationErrors.achievements;

export const getUserFormDescriptionError = (state: State): string | undefined =>
  state[NameSpace.UserForm].validationErrors.description;

export const isUserFormHaveErrors = (state: State): boolean =>
  Object.values(state[NameSpace.UserForm].validationErrors).some(
    (error) => error !== undefined,
  );

export const isUserFormDataSending = (state: State): boolean =>
  state[NameSpace.UserForm].isSending;
