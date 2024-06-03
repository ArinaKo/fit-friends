import { render, screen } from '@testing-library/react';
import WorkoutPage from './workout-page.component';
import {
  withStore,
  withHistory,
  makeFakeAppDataSlice,
  makeFakeWorkoutInfoSlice,
  extractActionsTypes,
} from '../../utils';
import { AppData, WorkoutInfo } from '../../types';
import userEvent from '@testing-library/user-event';
import { setActivePopup, setActiveRoute, setCommentForm } from '../../store';
import { UserRole } from '../../const';

vi.mock('../../components', () => ({
  default: vi.fn(),
  WorkoutInfo: () => <div>WorkoutInfo</div>,
  CommentsList: () => <div>CommentsList</div>,
  CommentForm: () => <div>CommentForm</div>,
  OrderForm: () => <div>OrderForm</div>,
  Popup: ({ children }: { children: JSX.Element }) => <div>{children}</div>,
  UIBlocker: () => <div>Загрузка</div>,
}));

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      workoutId: 'id',
    }),
  };
});

describe('Component: WorkoutPage', () => {
  const commentButtonTestId = 'commentButton';
  const mockAppDataSlice: AppData = {
    ...makeFakeAppDataSlice(),
    userRole: UserRole.Default,
  };
  const mockWorkoutInfoSlice: WorkoutInfo = {
    ...makeFakeWorkoutInfoSlice(),
    id: 'id',
  };

  it('should render correct', () => {
    const mockSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataLoading: false,
      balance: null,
    };
    const { withStoreComponent } = withStore(<WorkoutPage />, {
      APP_DATA: mockAppDataSlice,
      WORKOUT_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Карточка тренировки')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('CommentsList')).toBeInTheDocument();
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByTestId(commentButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(commentButtonTestId)).toBeDisabled();
    expect(screen.getByText('WorkoutInfo')).toBeInTheDocument();
    expect(screen.getByText('CommentForm')).toBeInTheDocument();
    expect(screen.getByText('OrderForm')).toBeInTheDocument();
  });

  it('comment button should be active when balance is not "null"', () => {
    const mockSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataLoading: false,
      balance: 4,
    };
    const { withStoreComponent } = withStore(<WorkoutPage />, {
      APP_DATA: mockAppDataSlice,
      WORKOUT_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(commentButtonTestId)).not.toBeDisabled();
  });

  it('should render ui blocker when data is loading', () => {
    const mockSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(<WorkoutPage />, {
      APP_DATA: mockAppDataSlice,
      WORKOUT_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });

  it('should render NotFoundPage when data has error', () => {
    const mockSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      hasError: true,
    };
    const { withStoreComponent } = withStore(<WorkoutPage />, {
      APP_DATA: mockAppDataSlice,
      WORKOUT_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });

  it('should dispatch "setCommentForm" and "setActivePopup" when user click add comment button', async () => {
    const mockSlice: WorkoutInfo = {
      ...mockWorkoutInfoSlice,
      isDataLoading: false,
      balance: 4,
    };
    const { withStoreComponent, mockStore } = withStore(<WorkoutPage />, {
      APP_DATA: mockAppDataSlice,
      WORKOUT_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(commentButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      setActiveRoute.type,
      setCommentForm.type,
      setActivePopup.type,
    ]);
  });
});
