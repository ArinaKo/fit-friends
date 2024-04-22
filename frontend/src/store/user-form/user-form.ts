import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserForm } from '../../types';
import {
  EmptyUserForm,
  MetroStation,
  NameSpace,
  REQUIRED_INPUT_MESSAGE,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '../../const';
import { loginAction, registerAction } from '../api-actions';

const initialState: UserForm = {
  email: EmptyUserForm.Email,
  password: EmptyUserForm.Password,
  name: EmptyUserForm.Name,
  sex: EmptyUserForm.Sex,
  dateOfBirth: EmptyUserForm.DateOfBirth,
  role: EmptyUserForm.Role,
  location: EmptyUserForm.Location,
  avatar: EmptyUserForm.Avatar,
  level: EmptyUserForm.Level,
  status: EmptyUserForm.Status,
  workoutTypes: EmptyUserForm.WorkoutTypes,
  timeForWorkout: EmptyUserForm.TimeForWorkout,
  caloriesToLose: EmptyUserForm.CaloriesToLose,
  caloriesPerDay: EmptyUserForm.CaloriesPerDay,
  certificates: EmptyUserForm.Certificates,
  achievements: EmptyUserForm.Achievements,
  validationErrors: EmptyUserForm.ValidationsErrors,
  isSending: false,
};

export const userForm = createSlice({
  name: NameSpace.UserForm,
  initialState,
  reducers: {
    resetUserForm: (state) => {
      state.email = EmptyUserForm.Email;
      state.password = EmptyUserForm.Password;
      state.name = EmptyUserForm.Name;
      state.sex = EmptyUserForm.Sex;
      state.dateOfBirth = EmptyUserForm.DateOfBirth;
      state.role = EmptyUserForm.Role;
      state.location = EmptyUserForm.Location;
      state.validationErrors = EmptyUserForm.ValidationsErrors;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSex: (state, action: PayloadAction<UserSex>) => {
      state.sex = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setLocation: (state, action: PayloadAction<MetroStation>) => {
      state.location = action.payload;
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.avatar = action.payload;
    },
    setLevel: (state, action: PayloadAction<UserLevel>) => {
      state.level = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    setWorkoutTypes: (state, action: PayloadAction<WorkoutType>) => {
      const type = action.payload;
      state.workoutTypes = state.workoutTypes.includes(type)
        ? state.workoutTypes.filter((item) => item !== type)
        : [...state.workoutTypes, type];
    },
    setTimeForWorkout: (state, action: PayloadAction<WorkoutDuration>) => {
      state.timeForWorkout = action.payload;
    },
    setCaloriesToLose: (state, action: PayloadAction<string>) => {
      state.caloriesToLose = action.payload;
    },
    setCaloriesPerDay: (state, action: PayloadAction<string>) => {
      state.caloriesPerDay = action.payload;
    },
    setCertificate: (state, action: PayloadAction<string>) => {
      const certificate = action.payload;
      state.certificates = state.certificates.includes(certificate)
        ? state.certificates.filter((item) => item !== certificate)
        : [...state.certificates, certificate];
    },
    setAchievements: (state, action: PayloadAction<string>) => {
      state.achievements = action.payload;
    },
    setUserFormError: (
      state,
      action: PayloadAction<[string, string | undefined]>
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
      if (!state.certificates.length) {
        state.validationErrors.certificates = REQUIRED_INPUT_MESSAGE;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.email = EmptyUserForm.Email;
        state.password = EmptyUserForm.Password;
        state.isSending = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isSending = false;
      })
      .addCase(registerAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.email = EmptyUserForm.Email;
        state.password = EmptyUserForm.Password;
        state.name = EmptyUserForm.Name;
        state.sex = EmptyUserForm.Sex;
        state.dateOfBirth = EmptyUserForm.DateOfBirth;
        state.role = EmptyUserForm.Role;
        state.location = EmptyUserForm.Location;
        state.validationErrors = EmptyUserForm.ValidationsErrors;
        state.isSending = false;
      })
      .addCase(registerAction.rejected, (state) => {
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
  setCertificate,
  setAchievements,
  setUserFormError,
  setLoginRequiredFields,
  setRegisterRequiredFields,
  setCustomerQuestionaryRequiredFields,
  setCoachQuestionaryRequiredFields,
} = userForm.actions;
