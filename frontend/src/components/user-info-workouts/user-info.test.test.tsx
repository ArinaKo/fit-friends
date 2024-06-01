import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeAppDataSlice,
  makeFakeUserInfoSlice,
  makeFakeWorkout,
  withStore,
} from '../../utils';
import UserInfoWorkouts from './user-info-workouts.component';
import { AppData, UserInfo } from '../../types';
import { APIRoute, UserRole } from '../../const';
import userEvent from '@testing-library/user-event';
import {
  createWorkoutRequestAction,
  subscribeToCoachAction,
  unsubscribeFromCoachAction,
} from '../../store';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderButtons: () => (
    <div data-testid="sliderButtons">SliderButtons component</div>
  ),
  WorkoutCard: () => <div data-testid="workoutCard">WorkoutCard component</div>,
  UIBlocker: () => <div>Загрузка</div>,
  ButtonsIconType: vi.fn(),
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: UserInfoWorkouts', () => {
  const requestButtonTestId = 'requestButton';
  const subscribeInputTestId = 'subscribeInput';
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockUserInfoSlice: UserInfo = {
    ...makeFakeUserInfoSlice(),
    role: UserRole.Coach,
    workouts: [makeFakeWorkout()],
  };

  it('should render correct for customer user', () => {
    const expectedText1 = 'Тренировки';
    const expectedText2 = 'Получать уведомление на почту о новой тренировке';
    const sliderTestId = 'sliderButtons';
    const workoutCardTestId = 'workoutCard';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      isFriend: false,
      subscriptionStatus: false,
    };
    const { withStoreComponent } = withStore(<UserInfoWorkouts />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(workoutCardTestId)).toHaveLength(1);
    expect(screen.getByTestId(subscribeInputTestId)).toBeInTheDocument();
  });

  it('should render correct for coach user', () => {
    const expectedText = 'Тренировки';
    const notExpectedText = 'Получать уведомление на почту о новой тренировке';
    const sliderTestId = 'sliderButtons';
    const workoutCardTestId = 'workoutCard';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      isFriend: true,
      isReady: true,
    };
    const { withStoreComponent } = withStore(<UserInfoWorkouts />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(workoutCardTestId)).toHaveLength(1);
    expect(screen.queryByTestId(subscribeInputTestId)).not.toBeInTheDocument();
    expect(screen.queryByTestId(requestButtonTestId)).not.toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const expectedText = 'Загрузка';
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      isWorkoutsLoading: true,
    };
    const { withStoreComponent } = withStore(<UserInfoWorkouts />, {
      APP_DATA: mockAppDataSlice,
      USER_INFO: userInfoSlice,
    });
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render request button for customer user when display user is ready and is a friend', () => {
    const expectedText = 'Хочу персональную тренировку';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      isFriend: true,
      isReady: true,
    };
    const { withStoreComponent } = withStore(<UserInfoWorkouts />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(requestButtonTestId)).toBeInTheDocument();
  });

  it('should dispatch "createWorkoutRequestAction.pending" and "createWorkoutRequestAction.fulfilled" when user click request button', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      isFriend: true,
      isReady: true,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <UserInfoWorkouts />,
      {
        APP_DATA: appDataSlice,
        USER_INFO: userInfoSlice,
      },
    );
    mockAxiosAdapter.onPost(APIRoute.CreateWorkoutRequest).reply(201);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(requestButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      createWorkoutRequestAction.pending.type,
      createWorkoutRequestAction.fulfilled.type,
    ]);
  });

  it('should dispatch "subscribeToCoachAction.pending" and "subscribeToCoachAction.fulfilled" when user click subscribe button and subscription status is "false"', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      subscriptionStatus: false,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <UserInfoWorkouts />,
      {
        APP_DATA: appDataSlice,
        USER_INFO: userInfoSlice,
      },
    );
    mockAxiosAdapter
      .onPatch(`${APIRoute.SubscribeTo}/${userInfoSlice.id}`)
      .reply(200);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(subscribeInputTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      subscribeToCoachAction.pending.type,
      subscribeToCoachAction.fulfilled.type,
    ]);
  });

  it('should dispatch "unsubscribeFromCoachAction.pending" and "unsubscribeFromCoachAction.fulfilled" when user click subscribe button and subscription status is "true"', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: UserInfo = {
      ...mockUserInfoSlice,
      subscriptionStatus: true,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <UserInfoWorkouts />,
      {
        APP_DATA: appDataSlice,
        USER_INFO: userInfoSlice,
      },
    );
    mockAxiosAdapter
      .onPatch(`${APIRoute.UnsubscribeFrom}/${userInfoSlice.id}`)
      .reply(200);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(subscribeInputTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      unsubscribeFromCoachAction.pending.type,
      unsubscribeFromCoachAction.fulfilled.type,
    ]);
  });
});
