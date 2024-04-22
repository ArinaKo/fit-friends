import Joi from 'joi';
import {
  CaloriesValue,
  CoachAchievementsLength,
  NameLength,
  PasswordLength,
  REQUIRED_INPUT_MESSAGE,
} from '../const';

type ValidationData = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  calories: string;
  achievements: string;
};

const ValidationSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Введите валидный адрес электронной почты')
    .required()
    .messages({ 'string.empty': REQUIRED_INPUT_MESSAGE }),
  password: Joi.string()
    .min(PasswordLength.Min)
    .message(
      `Рекомендуемая длина пароля ${PasswordLength.Min} - ${PasswordLength.Max} символов`
    )
    .max(PasswordLength.Max)
    .message(
      `Рекомендуемая длина пароля ${PasswordLength.Min} - ${PasswordLength.Max} символов`
    )
    .required()
    .messages({ 'string.empty': REQUIRED_INPUT_MESSAGE }),
  name: Joi.string()
    .pattern(/^[a-zа-яё]+$/i)
    .message('Только буквы русского/английского алфавита')
    .min(NameLength.Min)
    .message(
      `Рекомендуемая длина имени ${NameLength.Min} - ${NameLength.Max} символов`
    )
    .max(NameLength.Max)
    .message(
      `Рекомендуемая длина имени ${NameLength.Min} - ${NameLength.Max} символов`
    )
    .required()
    .messages({ 'string.empty': REQUIRED_INPUT_MESSAGE }),
  dateOfBirth: Joi.date().less('now').message('Некорректная дата рождения'),
  calories: Joi.number()
    .integer()
    .message('Введите целое число')
    .min(CaloriesValue.Min)
    .message(`Минимальное количество калорий: ${CaloriesValue.Min}`)
    .max(CaloriesValue.Max)
    .message(`Минимальное количество калорий: ${CaloriesValue.Max}`)
    .required()
    .messages({ 'number.base': REQUIRED_INPUT_MESSAGE }),
  achievements: Joi.string()
    .min(CoachAchievementsLength.Min)
    .message(
      `Рекомендуемая длина ${CoachAchievementsLength.Min} - ${CoachAchievementsLength.Max} символов`
    )
    .max(CoachAchievementsLength.Max)
    .message(
      `Рекомендуемая длина ${CoachAchievementsLength.Min} - ${CoachAchievementsLength.Max} символов`
    )
    .required()
    .messages({ 'string.empty': REQUIRED_INPUT_MESSAGE }),
};

const validateProperty = (
  propertyName: keyof ValidationData,
  value: unknown
): string | undefined =>
  ValidationSchema[propertyName].validate(value).error?.message;

export const validateEmail = (value: unknown) =>
  validateProperty('email', value);

export const validatePassword = (value: unknown) =>
  validateProperty('password', value);

export const validateName = (value: unknown) => validateProperty('name', value);

export const validateDateOfBirth = (value: unknown) =>
  validateProperty('dateOfBirth', value);

export const validateCalories = (value: unknown) =>
  validateProperty('calories', value);

export const validateAchievements = (value: unknown) =>
  validateProperty('achievements', value);
