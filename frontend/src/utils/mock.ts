import {
  Comment,
  FileData,
  Notification,
  State,
  User,
  Workout,
  WorkoutBalance,
  WorkoutOrders,
} from '../types';
import { datatype, image, internet, lorem, system } from 'faker';
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
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services';

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

export const makeFakeWorkoutOrders = (): WorkoutOrders => ({
  workout: makeFakeWorkout(),
  count: datatype.number(),
  sum: datatype.number(),
});

export const makeFakeFileData = (): FileData => ({
  id: randomUUID(),
  originalName: system.commonFileName(),
  subDirectory: lorem.word(),
  size: datatype.number(),
  mimetype: system.mimeType(),
  hashName: lorem.word(),
  path: image.imageUrl(),
});

export const makeFakeComment = (): Comment => ({
  id: randomUUID(),
  user: makeFakeUser(),
  rating: datatype.number(),
  text: lorem.lines(1),
});

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);
