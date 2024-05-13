import { AppRoute } from '../const';

export type Route = (typeof AppRoute)[keyof typeof AppRoute];
