import { transformObjectValuesToString } from "@app/helpers";
import { MetroStation, UserLevel, UserRole, UserSex, WorkoutDuration, WorkoutType } from "@app/types";
import { CaloriesValue, MAX_WORKOUTS_TYPES, UserAchievementsLength, UserDescriptionLength, UserNameLength, UserPasswordLength } from "src/const";

export const UserValidationMessage = {
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
  description: {
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
};