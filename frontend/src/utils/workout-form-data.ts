import { State } from '../types';

export function getCreateWorkoutData(state: State, video?: Blob): FormData {
  const {
    title,
    level,
    type,
    duration,
    price,
    calories,
    description,
    userSex,
  } = state.WORKOUT_FORM;
  const formData = new FormData();
  if (!level || !type || !duration || !video) {
    throw new Error('Not enough data for registration');
  }
  formData.append('title', title);
  formData.append('level', level);
  formData.append('type', type);
  formData.append('duration', duration);
  formData.append('price', price);
  formData.append('calories', calories);
  formData.append('description', description);
  formData.append('userSex', userSex);
  formData.append('video', video);
  return formData;
}
