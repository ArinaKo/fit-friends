import { transformObjectValuesToString } from '@app/helpers';
import {
  MetroStation,
  OrderType,
  PaymentType,
  RequestStatus,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutSexFor,
  WorkoutType,
} from '@app/types';
import {
  CaloriesValue,
  MAX_WORKOUTS_TYPES,
  OrderCountValue,
  PriceValue,
  RatingValue,
  UserAchievementsLength,
  UserDescriptionLength,
  UserNameLength,
  UserPasswordLength,
  WorkoutDescriptionLength,
  WorkoutTitleLength,
} from 'src/shared/const';

export const DtoValidationMessage = {
  name: {
    length: `Name length min is ${UserNameLength.Min}, max is ${UserNameLength.Max}`,
  },
  email: {
    invalidFormat: `Field value must be valid email`,
  },
  password: {
    length: `Password length min is ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`,
  },
  sex: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(UserSex)}`,
  },
  role: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(UserRole)}`,
  },
  userDescription: {
    length: `Description length min is ${UserDescriptionLength.Min}, max is ${UserDescriptionLength.Max}`,
  },
  location: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(MetroStation)}`,
  },
  level: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(UserLevel)}`,
  },
  workoutsTypes: {
    length: `Maximum number of items is ${MAX_WORKOUTS_TYPES}`,
    invalidItems: `Field items must be from options: ${transformObjectValuesToString(WorkoutType)}`,
  },
  timeForWorkout: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(WorkoutDuration)}`,
  },
  calories: {
    value: `Value must be from range: ${CaloriesValue.Min}-${CaloriesValue.Max}`,
  },
  achievements: {
    length: `Text length min is ${UserAchievementsLength.Min}, max is ${UserAchievementsLength.Max}`,
  },
  workoutDescription: {
    length: `Description length min is ${WorkoutDescriptionLength.Min}, max is ${WorkoutDescriptionLength.Max}`,
  },
  workoutTitle: {
    length: `Title length min is ${WorkoutTitleLength.Min}, max is ${WorkoutTitleLength.Max}`,
  },
  workoutSexFor: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(WorkoutSexFor)}`,
  },
  price: {
    value: `Value must be greater then: ${PriceValue.Min}`,
  },
  orderCount: {
    value: `Value must be from range: ${OrderCountValue.Min}-${OrderCountValue.Max}`,
  },
  paymentType: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(PaymentType)}`,
  },
  orderType: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(OrderType)}`,
  },
  rating: {
    value: `Value must be from range: ${RatingValue.Min}-${RatingValue.Max}`,
  },
  requestStatus: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(RequestStatus)}`,
  },
};
