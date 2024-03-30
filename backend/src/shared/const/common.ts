import { SortDirection } from "@app/types";

export const MAX_WORKOUTS_TYPES = 3;

export const DEFAULT_SORT_DIRECTION = SortDirection.Down;

export const LIST_LIMIT = 50;

export const DEFAULT_PAGE = 1;

export const DEFAULT_RATING = 0;

export enum CaloriesValue {
  Min = 1000,
  Max = 5000,
}

export enum PriceValue {
  Min = 0,
}

export enum RatingValue {
  Min = 1,
  Max = 5,
}

export enum OrderCountValue {
  Min = 1,
  Max = 50,
}

export enum UserNameLength {
  Min = 1,
  Max = 15,
}

export enum UserPasswordLength {
  Min = 6,
  Max = 12,
}

export enum UserDescriptionLength {
  Min = 10,
  Max = 140,
}

export enum UserAchievementsLength {
  Min = 10,
  Max = 140,
}

export enum WorkoutTitleLength {
  Min = 1,
  Max = 15,
}

export enum WorkoutDescriptionLength {
  Min = 10,
  Max = 140,
}
