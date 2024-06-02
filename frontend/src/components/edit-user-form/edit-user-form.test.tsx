import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserDataSlice,
  makeFakeUserFormSlice,
  withStore,
} from '../../utils';
import EditUserForm from './edit-user-form.component';
import { APIRoute } from '../../const';
import { UserData } from '../../types';
import userEvent from '@testing-library/user-event';
import lodash from 'lodash';
import {
  setAvatar,
  setDescription,
  setLevel,
  setLocation,
  setName,
  setSex,
  setStatus,
  setUserEditingStatus,
  setWorkoutTypes,
  updateUserAction,
} from '../../store';

describe('Component: EditUserForm', () => {
  const editButtonTestId = 'editButton';
  const mockUserDataSlice = makeFakeUserDataSlice();
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct when is not edited', () => {
    const userDataSlice: UserData = {
      ...mockUserDataSlice,
      isDataEditing: false,
    };
    const { withStoreComponent } = withStore(<EditUserForm />, {
      USER_DATA: userDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText('Обо мне')).toBeInTheDocument();
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Статус')).toBeInTheDocument();
    expect(screen.getByText('Готов тренировать')).toBeInTheDocument();
    expect(screen.getByText('Специализация')).toBeInTheDocument();
    expect(screen.getByText('Локация')).toBeInTheDocument();
    expect(screen.getByText('Пол')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Редактировать')).toBeInTheDocument();
    expect(screen.getByTestId(editButtonTestId)).toBeInTheDocument();
  });

  it('should render correct when edited', () => {
    const userDataSlice: UserData = {
      ...mockUserDataSlice,
      isDataEditing: true,
    };
    const { withStoreComponent } = withStore(<EditUserForm />, {
      USER_DATA: userDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText('Обо мне')).toBeInTheDocument();
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Статус')).toBeInTheDocument();
    expect(screen.getByText('Готов тренировать')).toBeInTheDocument();
    expect(screen.getByText('Специализация')).toBeInTheDocument();
    expect(screen.getByText('Локация')).toBeInTheDocument();
    expect(screen.getByText('Пол')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByTestId(editButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values when is not edited', () => {
    const { name, location, description, sex, level, workoutTypes } =
      mockUserDataSlice;
    const userDataSlice: UserData = {
      ...mockUserDataSlice,
      isDataEditing: false,
    };
    const { withStoreComponent } = withStore(<EditUserForm />, {
      USER_DATA: userDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(description)).toBeInTheDocument();
    expect(
      screen.getByText(lodash.capitalize(workoutTypes[0])),
    ).toBeInTheDocument();
    expect(screen.getAllByText(lodash.capitalize(sex))).toHaveLength(2);
    expect(screen.getAllByText(lodash.capitalize(level))).toHaveLength(2);
    expect(screen.getAllByText(`ст. м. ${location ?? ''}`)).toHaveLength(2);
  });

  it('should display correct values when is edited', () => {
    const { name, location, description, sex, level, workoutTypes } =
      mockUserFormSlice;
    const userDataSlice: UserData = {
      ...mockUserDataSlice,
      isDataEditing: false,
    };
    const { withStoreComponent } = withStore(<EditUserForm />, {
      USER_DATA: userDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(description)).toBeInTheDocument();
    expect(
      screen.getByText(lodash.capitalize(workoutTypes[0])),
    ).toBeInTheDocument();
    expect(screen.getByText(lodash.capitalize(sex))).toBeInTheDocument();
    expect(screen.getAllByText(lodash.capitalize(level))).toHaveLength(2);
    expect(screen.getByText(`ст. м. ${location ?? ''}`)).toBeInTheDocument();
  });

  it('should dispatch "setUserEditingStatus" when user click edit button', async () => {
    const userDataSlice: UserData = {
      ...mockUserDataSlice,
      isDataEditing: false,
    };
    const { withStoreComponent, mockStore } = withStore(<EditUserForm />, {
      USER_DATA: userDataSlice,
      USER_FORM: mockUserFormSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(editButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setUserEditingStatus.type]);
    expect(screen.getByText('Редактировать')).toBeInTheDocument();
  });

  it('should dispatch "updateUserAction.pending" and "updateUserAction.fulfilled" when user click save button', async () => {
    const userDataSlice: UserData = {
      ...mockUserDataSlice,
      isDataEditing: true,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <EditUserForm />,
      {
        USER_DATA: userDataSlice,
        USER_FORM: mockUserFormSlice,
      },
    );
    mockAxiosAdapter.onPatch(APIRoute.UpdateUser).reply(200, {});

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(editButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setAvatar.type,
      setName.type,
      setDescription.type,
      setStatus.type,
      setWorkoutTypes.type,
      setLocation.type,
      setSex.type,
      setLevel.type,
      updateUserAction.pending.type,
      updateUserAction.fulfilled.type,
    ]);
  });
});
