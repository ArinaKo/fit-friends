import { Notification } from '../types';
import { lorem } from 'faker';
import { randomUUID } from 'node:crypto';

export const makeFakeNotification = (): Notification => ({
  id: randomUUID(),
  text: lorem.lines(1),
  date: new Date(),
});
