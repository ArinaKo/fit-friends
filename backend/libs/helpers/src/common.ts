import { ValidationError } from 'class-validator';
import * as dayjs from 'dayjs';

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

export function generateRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function getRandomItems<T>(items: T[], count?: number): T[] {
  const startPosition = count
    ? generateRandomValue(0, items.length - count)
    : generateRandomValue(0, items.length - 1);
  const endPosition = count
    ? startPosition + count
    : generateRandomValue(startPosition + 1, items.length);
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

export function transformObjectValuesToString(items: object) {
  return Object.values(items).join(', ');
}

export function transformValidationErrors(errors: ValidationError[]) {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}
