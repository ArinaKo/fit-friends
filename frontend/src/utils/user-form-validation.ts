import Joi from 'joi';
import { NameLength, PasswordLength, REQUIRED_INPUT_MESSAGE } from '../const';

type ValidationData = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
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
