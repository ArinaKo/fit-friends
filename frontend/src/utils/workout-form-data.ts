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

export function getUpdateWorkoutData(state: State, newVideo?: Blob): FormData {
  const { title, price, description, isSpecial } = state.WORKOUT_INFO;
  const {
    title: newTitle,
    price: newPrice,
    description: newDescription,
    isSpecial: newSpecialStatus,
  } = state.WORKOUT_FORM;
  const formData = new FormData();
  if (title !== newTitle) {
    formData.append('title', newTitle);
  }
  if (price !== newPrice) {
    formData.append('price', newPrice);
  }
  if (description !== newDescription) {
    formData.append('description', newDescription);
  }
  if (isSpecial !== newSpecialStatus) {
    formData.append('isSpecial', String(newSpecialStatus));
  }
  if (newVideo) {
    formData.append('video', newVideo);
  }
  return formData;
}
