import {
  MetroStation,
  REQUIRED_INPUT_MESSAGE,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '../../const';
import { UserForm } from '../../types';
import {
  loginAction,
  questionaryCoachAction,
  questionaryCustomerAction,
  registerAction,
  updateUserAction,
} from '../api-actions';
import {
  resetUserForm,
  setAchievements,
  setAvatar,
  setCaloriesPerDay,
  setCaloriesToLose,
  setCertificatesAmount,
  setCoachQuestionaryRequiredFields,
  setCustomerQuestionaryRequiredFields,
  setDateOfBirth,
  setDescription,
  setLevel,
  setLocation,
  setLoginRequiredFields,
  setName,
  setPassword,
  setRegisterRequiredFields,
  setRole,
  setSex,
  setStatus,
  setTimeForWorkout,
  setUserFormError,
  setWorkoutTypes,
  userForm,
} from './user-form';

describe('UserForm Slice', () => {
  const initialState: UserForm = {
    email: '',
    password: '',
    name: '',
    sex: UserSex.Female,
    dateOfBirth: '',
    role: UserRole.Coach,
    location: undefined,
    avatar: undefined,
    level: UserLevel.Amateur,
    status: true,
    workoutTypes: [],
    timeForWorkout: WorkoutDuration.Medium,
    caloriesToLose: '',
    caloriesPerDay: '',
    certificatesAmount: 0,
    achievements: '',
    description: '',
    validationErrors: {
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
    },
    isSending: false,
  };

  describe('Default check', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = userForm.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };

      const result = userForm.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('Actions check', () => {
    it('should reset form data with "resetUserForm" action', () => {
      const state: UserForm = {
        ...initialState,
        caloriesToLose: '450',
        caloriesPerDay: '25',
        certificatesAmount: 4,
        achievements: 'text',
        description: 'text',
      };

      const result = userForm.reducer(state, resetUserForm());

      expect(result).toEqual(initialState);
    });

    it('should set password with "setPassword" action', () => {
      const expectedResult = 'password';

      const result = userForm.reducer(
        initialState,
        setPassword(expectedResult),
      );

      expect(result.password).toBe(expectedResult);
    });

    it('should set name with "setName" action', () => {
      const expectedResult = 'name';

      const result = userForm.reducer(initialState, setName(expectedResult));

      expect(result.name).toBe(expectedResult);
    });

    it('should set user sex with "setSex" action', () => {
      const expectedResult = UserSex.Male;

      const result = userForm.reducer(initialState, setSex(expectedResult));

      expect(result.sex).toBe(expectedResult);
    });

    it('should set dateOfBirth with "setDateOfBirth" action', () => {
      const expectedResult = '02-02-2000';

      const result = userForm.reducer(
        initialState,
        setDateOfBirth(expectedResult),
      );

      expect(result.dateOfBirth).toBe(expectedResult);
    });

    it('should set location with "setLocation" action', () => {
      const expectedResult = MetroStation.Devyatkino;

      const result = userForm.reducer(
        initialState,
        setLocation(expectedResult),
      );

      expect(result.location).toBe(expectedResult);
    });

    it('should set role with "setRole" action', () => {
      const expectedResult = UserRole.Coach;

      const result = userForm.reducer(initialState, setRole(expectedResult));

      expect(result.role).toBe(expectedResult);
    });

    it('should set avatar with "setAvatar" action', () => {
      const expectedResult = 'avatar.jpg';

      const result = userForm.reducer(initialState, setAvatar(expectedResult));

      expect(result.avatar).toBe(expectedResult);
    });

    it('should set level with "setLevel" action', () => {
      const expectedResult = UserLevel.Pro;

      const result = userForm.reducer(initialState, setLevel(expectedResult));

      expect(result.level).toBe(expectedResult);
    });

    it('should set status with "setStatus" action', () => {
      const expectedResult = true;

      const result = userForm.reducer(initialState, setStatus(expectedResult));

      expect(result.status).toBe(expectedResult);
    });

    it('should set workout types with "setWorkoutTypes" action', () => {
      const expectedResult = WorkoutType.Box;

      const result = userForm.reducer(
        initialState,
        setWorkoutTypes(expectedResult),
      );

      expect(result.workoutTypes).toEqual([expectedResult]);
    });

    it('should set time for workout with "setTimeForWorkout" action', () => {
      const expectedResult = WorkoutDuration.Short;

      const result = userForm.reducer(
        initialState,
        setTimeForWorkout(expectedResult),
      );

      expect(result.timeForWorkout).toBe(expectedResult);
    });

    it('should set calories to lose with "setCaloriesToLose" action', () => {
      const expectedResult = '350';

      const result = userForm.reducer(
        initialState,
        setCaloriesToLose(expectedResult),
      );

      expect(result.caloriesToLose).toBe(expectedResult);
    });

    it('should set calories per day with "setCaloriesPerDay" action', () => {
      const expectedResult = '50';

      const result = userForm.reducer(
        initialState,
        setCaloriesPerDay(expectedResult),
      );

      expect(result.caloriesPerDay).toBe(expectedResult);
    });

    it('should set certificates amount with "setCertificatesAmount" action', () => {
      const expectedResult = 4;

      const result = userForm.reducer(
        initialState,
        setCertificatesAmount(expectedResult),
      );

      expect(result.certificatesAmount).toBe(expectedResult);
    });

    it('should set achievements with "setAchievements" action', () => {
      const expectedResult = 'achievements';

      const result = userForm.reducer(
        initialState,
        setAchievements(expectedResult),
      );

      expect(result.achievements).toBe(expectedResult);
    });

    it('should set description with "setDescription" action', () => {
      const expectedResult = 'description';

      const result = userForm.reducer(
        initialState,
        setDescription(expectedResult),
      );

      expect(result.description).toBe(expectedResult);
    });

    it('should set error with "setUserFormError" action', () => {
      const actionPayload: [string, string | undefined] = [
        'description',
        'error',
      ];
      const expectedResult = {
        ...initialState.validationErrors,
        description: actionPayload[1],
      };

      const result = userForm.reducer(
        initialState,
        setUserFormError(actionPayload),
      );

      expect(result.validationErrors).toEqual(expectedResult);
    });

    it('should set required fields with "setLoginRequiredFields" action', () => {
      const expectedResult: UserForm = {
        ...initialState,
        validationErrors: {
          ...initialState.validationErrors,
          email: REQUIRED_INPUT_MESSAGE,
          password: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = userForm.reducer(initialState, setLoginRequiredFields());

      expect(result.validationErrors).toEqual(expectedResult.validationErrors);
    });

    it('should set required fields with "setRegisterRequiredFields" action', () => {
      const expectedResult: UserForm = {
        ...initialState,
        validationErrors: {
          ...initialState.validationErrors,
          email: REQUIRED_INPUT_MESSAGE,
          password: REQUIRED_INPUT_MESSAGE,
          name: REQUIRED_INPUT_MESSAGE,
          location: REQUIRED_INPUT_MESSAGE,
          avatar: REQUIRED_INPUT_MESSAGE,
          dateOfBirth: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = userForm.reducer(
        initialState,
        setRegisterRequiredFields(),
      );

      expect(result.validationErrors).toEqual(expectedResult.validationErrors);
    });

    it('should set required fields with "setCustomerQuestionaryRequiredFields" action', () => {
      const expectedResult: UserForm = {
        ...initialState,
        validationErrors: {
          ...initialState.validationErrors,
          workoutTypes: REQUIRED_INPUT_MESSAGE,
          caloriesPerDay: REQUIRED_INPUT_MESSAGE,
          caloriesToLose: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = userForm.reducer(
        initialState,
        setCustomerQuestionaryRequiredFields(),
      );

      expect(result.validationErrors).toEqual(expectedResult.validationErrors);
    });

    it('should set required fields with "setCoachQuestionaryRequiredFields" action', () => {
      const expectedResult: UserForm = {
        ...initialState,
        validationErrors: {
          ...initialState.validationErrors,
          workoutTypes: REQUIRED_INPUT_MESSAGE,
          achievements: REQUIRED_INPUT_MESSAGE,
          certificatesAmount: REQUIRED_INPUT_MESSAGE,
        },
      };

      const result = userForm.reducer(
        initialState,
        setCoachQuestionaryRequiredFields(),
      );

      expect(result.validationErrors).toEqual(expectedResult.validationErrors);
    });
  });

  describe('Api-actions check', () => {
    it('should set isSending to "true" with "loginAction.pending" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: false,
      };

      const result = userForm.reducer(state, loginAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "loginAction.fulfilled" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, loginAction.fulfilled);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "false" with "loginAction.rejected" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, loginAction.rejected);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "true" with "registerAction.pending" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: false,
      };

      const result = userForm.reducer(state, registerAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "registerAction.fulfilled" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, registerAction.fulfilled);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "false" with "registerAction.rejected" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, registerAction.rejected);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "true" with "questionaryCustomerAction.pending" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: false,
      };

      const result = userForm.reducer(state, questionaryCustomerAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "questionaryCustomerAction.fulfilled" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(
        state,
        questionaryCustomerAction.fulfilled,
      );

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "false" with "questionaryCustomerAction.rejected" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(
        state,
        questionaryCustomerAction.rejected,
      );

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "true" with "questionaryCoachAction.pending" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: false,
      };

      const result = userForm.reducer(state, questionaryCoachAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "questionaryCoachAction.fulfilled" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, questionaryCoachAction.fulfilled);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "false" with "questionaryCoachAction.rejected" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, questionaryCoachAction.rejected);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "true" with "updateUserAction.pending" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: false,
      };

      const result = userForm.reducer(state, updateUserAction.pending);

      expect(result.isSending).toBe(true);
    });

    it('should set isSending to "false" with "updateUserAction.fulfilled" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, updateUserAction.fulfilled);

      expect(result.isSending).toBe(false);
    });

    it('should set isSending to "false" with "updateUserAction.rejected" action', () => {
      const state: UserForm = {
        ...initialState,
        isSending: true,
      };

      const result = userForm.reducer(state, updateUserAction.rejected);

      expect(result.isSending).toBe(false);
    });
  });
});
