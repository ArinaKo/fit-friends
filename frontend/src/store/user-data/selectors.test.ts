import { NameSpace } from '../../const';
import { UserData } from '../../types';
import { makeFakeFileData, makeFakeUser } from '../../utils';
import {
  getUserDataAvatar,
  getUserDataCalories,
  getUserDataCertificates,
  getUserDataDescription,
  getUserDataIsReady,
  getUserDataLevel,
  getUserDataLocation,
  getUserDataName,
  getUserDataSex,
  getUserDataWorkoutTypes,
  isUserDataEditing,
  isUserDataReady,
  isUserDataUpdating,
} from './selectors';

describe('UserData selectors', () => {
  const user = makeFakeUser();
  const state: UserData = {
    ...user,
    avatar: makeFakeFileData(),
    description: 'description',
    caloriesToLose: 300,
    caloriesPerDay: 100,
    certificates: [makeFakeFileData()],
    isDataReady: true,
    isDataUpdating: false,
    isDataEditing: true,
  };

  it('should return avatar value', () => {
    const { avatar } = state;

    const result = getUserDataAvatar({ [NameSpace.UserData]: state });

    expect(result).toEqual(avatar);
  });

  it('should return name value', () => {
    const { name } = state;

    const result = getUserDataName({ [NameSpace.UserData]: state });

    expect(result).toBe(name);
  });

  it('should return isReady value', () => {
    const { isReady } = state;

    const result = getUserDataIsReady({ [NameSpace.UserData]: state });

    expect(result).toBe(isReady);
  });

  it('should return user sex value', () => {
    const { sex } = state;

    const result = getUserDataSex({ [NameSpace.UserData]: state });

    expect(result).toBe(sex);
  });

  it('should return location value', () => {
    const { location } = state;

    const result = getUserDataLocation({ [NameSpace.UserData]: state });

    expect(result).toBe(location);
  });

  it('should return level value', () => {
    const { level } = state;

    const result = getUserDataLevel({ [NameSpace.UserData]: state });

    expect(result).toBe(level);
  });

  it('should return workout types value', () => {
    const { workoutTypes } = state;

    const result = getUserDataWorkoutTypes({ [NameSpace.UserData]: state });

    expect(result).toEqual(workoutTypes);
  });

  it('should return description value', () => {
    const { description } = state;

    const result = getUserDataDescription({ [NameSpace.UserData]: state });

    expect(result).toBe(description);
  });

  it('should return calories per day value', () => {
    const { caloriesPerDay } = state;

    const result = getUserDataCalories({ [NameSpace.UserData]: state });

    expect(result).toBe(caloriesPerDay);
  });

  it('should return certificates value', () => {
    const { certificates } = state;

    const result = getUserDataCertificates({ [NameSpace.UserData]: state });

    expect(result).toEqual(certificates);
  });

  it('should return data ready status', () => {
    const { isDataReady } = state;

    const result = isUserDataReady({ [NameSpace.UserData]: state });

    expect(result).toBe(isDataReady);
  });

  it('should return data updating status', () => {
    const { isDataUpdating } = state;

    const result = isUserDataUpdating({ [NameSpace.UserData]: state });

    expect(result).toBe(isDataUpdating);
  });

  it('should return data editing status', () => {
    const { isDataEditing } = state;

    const result = isUserDataEditing({ [NameSpace.UserData]: state });

    expect(result).toBe(isDataEditing);
  });
});
