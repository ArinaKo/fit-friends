import { State } from '../types';

export function getRegisterData(state: State, avatar?: Blob): FormData {
  const { email, password, name, sex, dateOfBirth, role, location } =
    state.USER_FORM;
  const formData = new FormData();
  if (!email || !password || !name || !location || !avatar) {
    throw new Error('Not enough data for registration');
  }
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  formData.append('sex', sex);
  if (dateOfBirth.length) {
    formData.append('dateOfBirth', dateOfBirth);
  }
  formData.append('role', role);
  formData.append('location', location);
  formData.append('avatar', avatar);
  return formData;
}

export function getCustomerQuestionaryData(state: State): FormData {
  const {
    level,
    workoutTypes,
    timeForWorkout,
    caloriesPerDay,
    caloriesToLose,
  } = state.USER_FORM;
  const formData = new FormData();
  if (!workoutTypes.length || !caloriesPerDay || !caloriesToLose) {
    throw new Error('Not enough data for customer questionary');
  }
  formData.append('level', level);
  formData.append('timeForWorkout', timeForWorkout);
  formData.append('caloriesPerDay', caloriesPerDay.toString());
  formData.append('caloriesToLose', caloriesToLose.toString());
  workoutTypes.forEach((type) => {
    formData.append('workoutTypes[]', type);
  });
  return formData;
}

export function getCoachQuestionaryData(
  state: State,
  certificates?: Blob[]
): FormData {
  const { level, workoutTypes, achievements } = state.USER_FORM;
  const formData = new FormData();
  if (!workoutTypes.length || !certificates?.length) {
    throw new Error('Not enough data for coach questionary');
  }
  formData.append('level', level);
  formData.append('achievements', achievements);
  certificates.forEach((certificate) => {
    formData.append('certificates[]', certificate);
  });
  return formData;
}
