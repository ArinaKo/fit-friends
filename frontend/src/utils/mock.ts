import { Notification, User, Workout, WorkoutBalance } from '../types';
import { datatype, image, internet, lorem } from 'faker';
import { randomUUID } from 'node:crypto';
import {
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '../const';

function generateRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export const makeFakeNotification = (): Notification => ({
  id: randomUUID(),
  text: lorem.lines(1),
  date: new Date(),
});

export const makeFakeWorkout = (): Workout => ({
  id: randomUUID(),
  coachId: randomUUID(),
  title: lorem.word(),
  backgroundImage: image.imageUrl(),
  level: getRandomItem(Object.values(UserLevel)),
  type: getRandomItem(Object.values(WorkoutType)),
  duration: getRandomItem(Object.values(WorkoutDuration)),
  price: datatype.number(),
  calories: datatype.number(),
  description: lorem.lines(),
  userSex: getRandomItem(Object.values(WorkoutSexFor)),
  isSpecial: datatype.boolean(),
  rating: datatype.number(),
});

export const makeFakeBalance = (): WorkoutBalance => ({
  workout: makeFakeWorkout(),
  count: datatype.number(),
});

export const makeFakeUser = (): User => ({
  id: randomUUID(),
  name: internet.userName(),
  sex: UserSex.Male,
  role: UserRole.Default,
  location: getRandomItem(Object.values(MetroStation)),
  level: getRandomItem(Object.values(UserLevel)),
  workoutTypes: [getRandomItem(Object.values(WorkoutType))],
  isReady: datatype.boolean(),
});
