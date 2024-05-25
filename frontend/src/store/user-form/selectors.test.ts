import { NameSpace, WorkoutDuration } from '../../const';
import { UserForm } from '../../types';
import { makeFakeUser } from '../../utils';
import {
  getUserFormAchievements,
  getUserFormAchievementsError,
  getUserFormAvatar,
  getUserFormAvatarError,
  getUserFormCaloriesPerDay,
  getUserFormCaloriesPerDayError,
  getUserFormCaloriesToLose,
  getUserFormCaloriesToLoseError,
  getUserFormCertificatesAmount,
  getUserFormCertificatesError,
  getUserFormDateOfBirth,
  getUserFormDateOfBirthError,
  getUserFormDescription,
  getUserFormDescriptionError,
  getUserFormEmail,
  getUserFormEmailError,
  getUserFormLevel,
  getUserFormLevelError,
  getUserFormLocation,
  getUserFormLocationError,
  getUserFormName,
  getUserFormNameError,
  getUserFormPassword,
  getUserFormPasswordError,
  getUserFormRole,
  getUserFormSex,
  getUserFormSexError,
  getUserFormStatus,
  getUserFormTimeForWorkout,
  getUserFormWorkoutTypes,
  getUserFormWorkoutTypesError,
  isUserFormDataSending,
  isUserFormHaveErrors,
} from './selectors';

describe('UserForm selectors', () => {
  const user = makeFakeUser();
  const state: UserForm = {
    ...user,
    email: 'email@local.local',
    password: '123456',
    dateOfBirth: 'date',
    avatar: 'avatar.png',
    status: true,
    timeForWorkout: WorkoutDuration.Medium,
    caloriesToLose: '500',
    caloriesPerDay: '100',
    certificatesAmount: 2,
    achievements: 'achievements',
    description: 'description',
    validationErrors: {
      email: 'email error',
      password: 'password error',
      name: 'name error',
      sex: 'sex error',
      dateOfBirth: 'date error',
      location: 'location error',
      avatar: 'avatar error',
      level: 'level error',
      workoutTypes: 'types error',
      caloriesToLose: 'calories to lose error',
      caloriesPerDay: 'calories per day error',
      certificatesAmount: 'certificates error',
      achievements: 'achievements error',
      description: 'description error',
    },
    isSending: false,
  };

  it('should return email value', () => {
    const { email } = state;

    const result = getUserFormEmail({ [NameSpace.UserForm]: state });

    expect(result).toBe(email);
  });

  it('should return password value', () => {
    const { password } = state;

    const result = getUserFormPassword({ [NameSpace.UserForm]: state });

    expect(result).toBe(password);
  });

  it('should return name value', () => {
    const { name } = state;

    const result = getUserFormName({ [NameSpace.UserForm]: state });

    expect(result).toBe(name);
  });

  it('should return birthday value', () => {
    const { dateOfBirth } = state;

    const result = getUserFormDateOfBirth({ [NameSpace.UserForm]: state });

    expect(result).toBe(dateOfBirth);
  });

  it('should return user sex value', () => {
    const { sex } = state;

    const result = getUserFormSex({ [NameSpace.UserForm]: state });

    expect(result).toBe(sex);
  });

  it('should return role value', () => {
    const { role } = state;

    const result = getUserFormRole({ [NameSpace.UserForm]: state });

    expect(result).toBe(role);
  });

  it('should return location value', () => {
    const { location } = state;

    const result = getUserFormLocation({ [NameSpace.UserForm]: state });

    expect(result).toBe(location);
  });

  it('should return avatar value', () => {
    const { avatar } = state;

    const result = getUserFormAvatar({ [NameSpace.UserForm]: state });

    expect(result).toEqual(avatar);
  });

  it('should return level value', () => {
    const { level } = state;

    const result = getUserFormLevel({ [NameSpace.UserForm]: state });

    expect(result).toBe(level);
  });

  it('should return status value', () => {
    const { status } = state;

    const result = getUserFormStatus({ [NameSpace.UserForm]: state });

    expect(result).toBe(status);
  });

  it('should return workout types value', () => {
    const { workoutTypes } = state;

    const result = getUserFormWorkoutTypes({ [NameSpace.UserForm]: state });

    expect(result).toEqual(workoutTypes);
  });

  it('should return time for workout value', () => {
    const { timeForWorkout } = state;

    const result = getUserFormTimeForWorkout({ [NameSpace.UserForm]: state });

    expect(result).toBe(timeForWorkout);
  });

  it('should return calories to lose value', () => {
    const { caloriesToLose } = state;

    const result = getUserFormCaloriesToLose({ [NameSpace.UserForm]: state });

    expect(result).toBe(caloriesToLose);
  });

  it('should return calories per day value', () => {
    const { caloriesPerDay } = state;

    const result = getUserFormCaloriesPerDay({ [NameSpace.UserForm]: state });

    expect(result).toBe(caloriesPerDay);
  });

  it('should return achievements value', () => {
    const { achievements } = state;

    const result = getUserFormAchievements({ [NameSpace.UserForm]: state });

    expect(result).toBe(achievements);
  });

  it('should return description value', () => {
    const { description } = state;

    const result = getUserFormDescription({ [NameSpace.UserForm]: state });

    expect(result).toBe(description);
  });

  it('should return certificates amount value', () => {
    const { certificatesAmount } = state;

    const result = getUserFormCertificatesAmount({
      [NameSpace.UserForm]: state,
    });

    expect(result).toBe(certificatesAmount);
  });

  it('should return "true" because form has validation errors', () => {
    const validationErrors = { ...state.validationErrors, email: 'error' };
    const currentState = { ...state, validationErrors };

    const result = isUserFormHaveErrors({
      [NameSpace.UserForm]: currentState,
    });

    expect(result).toBe(true);
  });

  it('should return "false" because form doesn\'t have any validation errors', () => {
    const validationErrors = {
      email: undefined,
      password: undefined,
      name: undefined,
      sex: undefined,
      dateOfBirth: undefined,
      location: undefined,
      avatar: undefined,
      level: undefined,
      workoutTypes: undefined,
      caloriesToLose: undefined,
      caloriesPerDay: undefined,
      certificatesAmount: undefined,
      achievements: undefined,
      description: undefined,
    };
    const currentState = { ...state, validationErrors };

    const result = isUserFormHaveErrors({ [NameSpace.UserForm]: currentState });

    expect(result).toBe(false);
  });

  it('should return data sending status', () => {
    const { isSending } = state;

    const result = isUserFormDataSending({ [NameSpace.UserForm]: state });

    expect(result).toBe(isSending);
  });

  describe('Validation selectors', () => {
    it('should return email validation error', () => {
      const { email } = state.validationErrors;

      const result = getUserFormEmailError({ [NameSpace.UserForm]: state });

      expect(result).toBe(email);
    });

    it('should return password validation error', () => {
      const { password } = state.validationErrors;

      const result = getUserFormPasswordError({ [NameSpace.UserForm]: state });

      expect(result).toBe(password);
    });

    it('should return name validation error', () => {
      const { name } = state.validationErrors;

      const result = getUserFormNameError({ [NameSpace.UserForm]: state });

      expect(result).toBe(name);
    });

    it('should return birthday validation error', () => {
      const { dateOfBirth } = state.validationErrors;

      const result = getUserFormDateOfBirthError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toBe(dateOfBirth);
    });

    it('should return user sex validation error', () => {
      const { sex } = state.validationErrors;

      const result = getUserFormSexError({ [NameSpace.UserForm]: state });

      expect(result).toBe(sex);
    });

    it('should return location validation error', () => {
      const { location } = state.validationErrors;

      const result = getUserFormLocationError({ [NameSpace.UserForm]: state });

      expect(result).toBe(location);
    });

    it('should return avatar validation error', () => {
      const { avatar } = state.validationErrors;

      const result = getUserFormAvatarError({ [NameSpace.UserForm]: state });

      expect(result).toEqual(avatar);
    });

    it('should return level validation error', () => {
      const { level } = state.validationErrors;

      const result = getUserFormLevelError({ [NameSpace.UserForm]: state });

      expect(result).toBe(level);
    });

    it('should return workout types validation error', () => {
      const { workoutTypes } = state.validationErrors;

      const result = getUserFormWorkoutTypesError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toEqual(workoutTypes);
    });

    it('should return calories to lose validation error', () => {
      const { caloriesToLose } = state.validationErrors;

      const result = getUserFormCaloriesToLoseError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toBe(caloriesToLose);
    });

    it('should return calories per day validation error', () => {
      const { caloriesPerDay } = state.validationErrors;

      const result = getUserFormCaloriesPerDayError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toBe(caloriesPerDay);
    });

    it('should return certificates validation error', () => {
      const { certificatesAmount } = state.validationErrors;

      const result = getUserFormCertificatesError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toBe(certificatesAmount);
    });

    it('should return achievements validation error', () => {
      const { achievements } = state.validationErrors;

      const result = getUserFormAchievementsError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toBe(achievements);
    });

    it('should return description validation error', () => {
      const { description } = state.validationErrors;

      const result = getUserFormDescriptionError({
        [NameSpace.UserForm]: state,
      });

      expect(result).toBe(description);
    });
  });
});
