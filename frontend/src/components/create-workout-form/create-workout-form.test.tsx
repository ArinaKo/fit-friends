import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutFormSlice,
  withStore,
} from '../../utils';
import CreateWorkoutForm from './create-workout-form.component';
import { APIRoute } from '../../const';
import { WorkoutForm } from '../../types';
import userEvent from '@testing-library/user-event';
import lodash from 'lodash';
import {
  setCreationRequiredFields,
  createWorkoutAction,
  setWorkoutFormError,
  setVideoPresence,
} from '../../store';
import { redirectToRoute } from '../../store/actions';

describe('Component: CreateWorkoutForm', () => {
  const submitButtonTestId = 'submitButton';
  const fileInputTestId = 'fileInput';
  const mockWorkoutFormSlice = makeFakeWorkoutFormSlice();

  it('should render correct', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: false,
    };
    const { withStoreComponent } = withStore(<CreateWorkoutForm />, {
      WORKOUT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText('Название тренировки')).toBeInTheDocument();
    expect(screen.getByText('Характеристики тренировки')).toBeInTheDocument();
    expect(screen.getByText('Выберите тип тренировки')).toBeInTheDocument();
    expect(screen.getByText('Сколько времени потратим')).toBeInTheDocument();
    expect(screen.getByText('Выберите уровень тренировки')).toBeInTheDocument();
    expect(screen.getByText('Сколько калорий потратим')).toBeInTheDocument();
    expect(screen.getByText('Стоимость тренировки')).toBeInTheDocument();
    expect(screen.getByText('Кому подойдет тренировка')).toBeInTheDocument();
    expect(screen.getByText('Кому подойдет тренировка')).toBeInTheDocument();
    expect(screen.getByText('Описание тренировки')).toBeInTheDocument();
    expect(screen.getByText('Загрузите видео-тренировку')).toBeInTheDocument();
    expect(
      screen.getByText('Загрузите сюда файл формата MOV, AVI или MP4'),
    ).toBeInTheDocument();
    expect(screen.getByText('Опубликовать')).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
  });

  it('should display correct values', () => {
    const mockSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      hasVideo: true,
    };
    const {
      title,
      type,
      duration,
      level,
      calories,
      price,
      userSex,
      description,
    } = mockWorkoutFormSlice;
    const { withStoreComponent } = withStore(<CreateWorkoutForm />, {
      WORKOUT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    expect(screen.getAllByText(lodash.capitalize(type ?? ''))).toHaveLength(2);
    expect(
      screen.getAllByText(lodash.capitalize(`${duration ?? ''} мин`)),
    ).toHaveLength(2);
    expect(screen.getAllByText(lodash.capitalize(level ?? ''))).toHaveLength(2);
    expect(screen.getByDisplayValue(calories)).toBeInTheDocument();
    expect(screen.getByDisplayValue(price)).toBeInTheDocument();
    expect(screen.getByLabelText(lodash.capitalize(userSex))).toBeChecked();
    expect(screen.getByDisplayValue(description)).toBeInTheDocument();
    expect(screen.getByText('Видео загружено')).toBeInTheDocument();
  });

  it('should dispatch "setCreationRequiredFields", "createWorkoutAction.pending" and "createWorkoutAction.fulfilled" when coach user click submit button', async () => {
    const mockFile = new File([], '');
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <CreateWorkoutForm />,
      {
        WORKOUT_FORM: mockWorkoutFormSlice,
      },
    );
    mockAxiosAdapter.onPost(APIRoute.Workouts).reply(201);

    render(withStoreComponent);
    fireEvent.change(screen.getByTestId(fileInputTestId), {
      target: { files: [mockFile] },
    });
    await userEvent.click(screen.getByTestId(submitButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setVideoPresence.type,
      setWorkoutFormError.type,
      setCreationRequiredFields.type,
      createWorkoutAction.pending.type,
      redirectToRoute.type,
      createWorkoutAction.fulfilled.type,
    ]);
  });
});
