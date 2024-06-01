import { render, screen } from '@testing-library/react';
import {
  makeFakeWorkout,
  makeFakeUser,
  makeFakeFileData,
  makeFakeAppDataSlice,
  makeFakeWorkoutInfoSlice,
  makeFakeWorkoutFormSlice,
  withStore,
  extractActionsTypes,
} from '../../utils';
import WorkoutInfo from './workout-info.component';
import {
  AppData,
  FullWorkout,
  WorkoutInfo as SliceType,
  WorkoutForm,
} from '../../types';
import { APIRoute, UserRole } from '../../const';
import {
  setActivePopup,
  setOrderForm,
  setPrice,
  setTitle,
  setUpdateWorkoutRequiredFields,
  setWorkoutDescription,
  setWorkoutEditingStatus,
  updateWorkoutAction,
} from '../../store';
import userEvent from '@testing-library/user-event';

vi.mock('../index', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  WorkoutVideo: () => (
    <div data-testid="workoutVideo">workoutVideo component</div>
  ),
}));

vi.mock('./coach.component', () => ({
  default: () => <div data-testid="coach">Coach component</div>,
}));

vi.mock('./hashtags.component', () => ({
  default: () => <div data-testid="hashtags">Hashtags component</div>,
}));

vi.mock('./rating.component', () => ({
  default: () => <div data-testid="rating">Rating component</div>,
}));

vi.mock('./special-status.component', () => ({
  default: () => <div data-testid="specialStatus">SpecialStatus component</div>,
}));

describe('Component: WorkoutInfo', () => {
  const coachComponentTestId = 'coach';
  const hashtagsComponentTestId = 'hashtags';
  const ratingComponentTestId = 'rating';
  const videoComponentTestId = 'workoutVideo';
  const buyButtonTestId = 'buyButton';
  const editButtonTestId = 'editButton';
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockWorkoutInfoSlice = makeFakeWorkoutInfoSlice();
  const mockWorkoutFormSlice = makeFakeWorkoutFormSlice();
  const fullWorkoutData: FullWorkout = {
    ...makeFakeWorkout(),
    coach: makeFakeUser(),
    video: makeFakeFileData(),
    balance: null,
    comments: [],
  };

  it('should render correct for user', () => {
    const expectedText = 'Информация о тренировке';
    const buyButtonText = 'Купить';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const workoutInfoSlice: SliceType = {
      ...mockWorkoutInfoSlice,
      balance: null,
    };
    const { title, description, price } = workoutInfoSlice;
    const { withStoreComponent } = withStore(<WorkoutInfo />, {
      APP_DATA: appDataSlice,
      WORKOUT_INFO: workoutInfoSlice,
      WORKOUT_FORM: mockWorkoutFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(buyButtonText)).toBeInTheDocument();
    expect(screen.getByTestId(buyButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buyButtonTestId)).not.toBeDisabled();
    expect(screen.queryByTestId(editButtonTestId)).not.toBeInTheDocument();
    expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(`${price} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId(coachComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(hashtagsComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(videoComponentTestId)).toBeInTheDocument();
  });

  it('should render correct for coach', () => {
    const expectedText = 'Информация о тренировке';
    const editButtonText = 'Редактировать';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const workoutInfoSlice: SliceType = {
      ...mockWorkoutInfoSlice,
      isDataEditing: false,
    };
    const { title, description, price } = mockWorkoutInfoSlice;
    const { withStoreComponent } = withStore(<WorkoutInfo />, {
      APP_DATA: appDataSlice,
      WORKOUT_INFO: workoutInfoSlice,
      WORKOUT_FORM: mockWorkoutFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByTestId(buyButtonTestId)).not.toBeInTheDocument();
    expect(screen.getByText(editButtonText)).toBeInTheDocument();
    expect(screen.getByTestId(editButtonTestId)).toBeInTheDocument();
    expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(`${price} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId(coachComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(hashtagsComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingComponentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(videoComponentTestId)).toBeInTheDocument();
  });

  it('should render buy button disabled when balance value not 0', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const workoutInfoSlice: SliceType = {
      ...mockWorkoutInfoSlice,
      balance: 3,
    };
    const { withStoreComponent } = withStore(<WorkoutInfo />, {
      APP_DATA: appDataSlice,
      WORKOUT_INFO: workoutInfoSlice,
      WORKOUT_FORM: mockWorkoutFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(buyButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buyButtonTestId)).toBeDisabled();
  });

  it('should dispatch "setOrderForm" and "setActivePopup" when user click buy button', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const workoutInfoSlice: SliceType = {
      ...mockWorkoutInfoSlice,
      balance: 0,
    };
    const { withStoreComponent, mockStore } = withStore(<WorkoutInfo />, {
      APP_DATA: appDataSlice,
      WORKOUT_INFO: workoutInfoSlice,
      WORKOUT_FORM: mockWorkoutFormSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(buyButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setOrderForm.type, setActivePopup.type]);
  });

  it('should dispatch "setWorkoutEditingStatus" when coach click buy button and form is not active', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const workoutInfoSlice: SliceType = {
      ...mockWorkoutInfoSlice,
      isDataEditing: false,
    };
    const { withStoreComponent, mockStore } = withStore(<WorkoutInfo />, {
      APP_DATA: appDataSlice,
      WORKOUT_INFO: workoutInfoSlice,
      WORKOUT_FORM: mockWorkoutFormSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(editButtonTestId));
    const actions = mockStore.getActions();
    const actionsTypes = extractActionsTypes(actions);

    expect(actionsTypes).toEqual([setWorkoutEditingStatus.type]);
  });

  it('should dispatch "setUpdateWorkoutRequiredFields", "updateWorkoutAction.pending" and "updateWorkoutAction.fulfilled" when coach click buy button and form is active', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const workoutInfoSlice: SliceType = {
      ...mockWorkoutInfoSlice,
      isDataEditing: true,
    };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <WorkoutInfo />,
      {
        APP_DATA: appDataSlice,
        WORKOUT_INFO: workoutInfoSlice,
        WORKOUT_FORM: mockWorkoutFormSlice,
      },
    );
    mockAxiosAdapter
      .onPatch(`${APIRoute.UpdateWorkout}/${workoutInfoSlice.id}`)
      .reply(200, fullWorkoutData);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(editButtonTestId));
    const actions = mockStore.getActions();
    const actionsTypes = extractActionsTypes(actions);

    expect(actionsTypes).toEqual([
      setTitle.type,
      setWorkoutDescription.type,
      setPrice.type,
      setUpdateWorkoutRequiredFields.type,
      updateWorkoutAction.pending.type,
      updateWorkoutAction.fulfilled.type,
    ]);
  });

  it('should render ui blocker when data is sending', () => {
    const expectedText = 'Загрузка';
    const workoutFormSlice: WorkoutForm = {
      ...mockWorkoutFormSlice,
      isSending: true,
    };
    const { withStoreComponent } = withStore(<WorkoutInfo />, {
      APP_DATA: mockAppDataSlice,
      WORKOUT_INFO: mockWorkoutInfoSlice,
      WORKOUT_FORM: workoutFormSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
