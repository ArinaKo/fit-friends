import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserForm } from '../../types';
import {
  NameSpace,
  REQUIRED_INPUT_MESSAGE,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '../../const';
import {
  loginAction,
  questionaryCoachAction,
  questionaryCustomerAction,
  registerAction,
  updateUserAction,
} from '../api-actions';

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

export const userForm = createSlice({
  name: NameSpace.UserForm,
  initialState,
  reducers: {
    resetUserForm: () => ({ ...initialState }),
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSex: (state, action: PayloadAction<string>) => {
      state.sex = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.avatar = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    setWorkoutTypes: (
      state,
      action: PayloadAction<WorkoutType | WorkoutType[]>,
    ) => {
      if (typeof action.payload === 'object') {
        state.workoutTypes = action.payload;
        return;
      }
      const type = action.payload;
      state.workoutTypes = state.workoutTypes.includes(type)
        ? state.workoutTypes.filter((item) => item !== type)
        : [...state.workoutTypes, type];
    },
    setTimeForWorkout: (state, action: PayloadAction<string>) => {
      state.timeForWorkout = action.payload;
    },
    setCaloriesToLose: (state, action: PayloadAction<string>) => {
      state.caloriesToLose = action.payload;
    },
    setCaloriesPerDay: (state, action: PayloadAction<string>) => {
      state.caloriesPerDay = action.payload;
    },
    setCertificatesAmount: (state, action: PayloadAction<number>) => {
      state.certificatesAmount = action.payload;
    },
    setAchievements: (state, action: PayloadAction<string>) => {
      state.achievements = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setUserFormError: (
      state,
      action: PayloadAction<[string, string | undefined]>,
    ) => {
      state.validationErrors = {
        ...state.validationErrors,
        [action.payload[0]]: action.payload[1],
      };
    },
    setLoginRequiredFields: (state) => {
      if (!state.email) {
        state.validationErrors.email = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.password) {
        state.validationErrors.password = REQUIRED_INPUT_MESSAGE;
      }
    },
    setRegisterRequiredFields: (state) => {
      if (!state.email) {
        state.validationErrors.email = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.password) {
        state.validationErrors.password = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.name) {
        state.validationErrors.name = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.location) {
        state.validationErrors.location = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.avatar) {
        state.validationErrors.avatar = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.dateOfBirth) {
        state.validationErrors.dateOfBirth = REQUIRED_INPUT_MESSAGE;
      }
    },
    setCustomerQuestionaryRequiredFields: (state) => {
      if (!state.workoutTypes.length) {
        state.validationErrors.workoutTypes = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.caloriesPerDay) {
        state.validationErrors.caloriesPerDay = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.caloriesToLose) {
        state.validationErrors.caloriesToLose = REQUIRED_INPUT_MESSAGE;
      }
    },
    setCoachQuestionaryRequiredFields: (state) => {
      if (!state.workoutTypes.length) {
        state.validationErrors.workoutTypes = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.achievements) {
        state.validationErrors.achievements = REQUIRED_INPUT_MESSAGE;
      }
      if (!state.certificatesAmount) {
        state.validationErrors.certificatesAmount = REQUIRED_INPUT_MESSAGE;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(loginAction.fulfilled, () => ({ ...initialState }))
      .addCase(loginAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(registerAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(registerAction.fulfilled, () => ({ ...initialState }))
      .addCase(registerAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(questionaryCustomerAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(questionaryCustomerAction.fulfilled, () => ({ ...initialState }))
      .addCase(questionaryCustomerAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(questionaryCoachAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(questionaryCoachAction.fulfilled, () => ({ ...initialState }))
      .addCase(questionaryCoachAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(updateUserAction.fulfilled, () => ({ ...initialState }))
      .addCase(updateUserAction.rejected, (state) => {
        state.isSending = false;
      });
  },
});

export const {
  resetUserForm,
  setEmail,
  setPassword,
  setDateOfBirth,
  setLocation,
  setName,
  setRole,
  setSex,
  setAvatar,
  setLevel,
  setStatus,
  setWorkoutTypes,
  setTimeForWorkout,
  setCaloriesToLose,
  setCaloriesPerDay,
  setCertificatesAmount,
  setAchievements,
  setDescription,
  setUserFormError,
  setLoginRequiredFields,
  setRegisterRequiredFields,
  setCustomerQuestionaryRequiredFields,
  setCoachQuestionaryRequiredFields,
} = userForm.actions;
