import { ValidationError } from 'class-validator';
import dayjs from 'dayjs';

enum DateDiffNumber {
  Min = 1,
  Max = 10,
}

export function generateDate() {
  return dayjs()
    .subtract(
      generateRandomValue(DateDiffNumber.Min, DateDiffNumber.Max),
      'day',
    )
    .toISOString();
}

export function generateRandomValue(
  min: number,
  max: number,
) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function getRandomItems<T>(items: T[], count?: number): T[] {
  const startPosition = generateRandomValue(0, count ? count : items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function transformObjectValuesToString(items: Object) {
  return Object.values(items).join(', ');
}

export function reduceValidationErrors(
  errors: ValidationError[]
) {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}
