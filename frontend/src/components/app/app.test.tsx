import { render, screen } from '@testing-library/react';
import App from './app.component';
import { makeFakeAppDataSlice, withStore, withHistory } from '../../utils';
import { AppData } from '../../types';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MemoryHistory, createMemoryHistory } from 'history';

vi.mock('../../pages', () => ({
  default: vi.fn(),
  AccountPage: () => <div>AccountPage</div>,
  BalancePage: () => <div>BalancePage</div>,
  CoachWorkoutsPage: () => <div>CoachWorkoutsPage</div>,
  CreateWorkoutPage: () => <div>CreateWorkoutPage</div>,
  FriendsPage: () => <div>FriendsPage</div>,
  IntroPage: () => <div>IntroPage</div>,
  LoginPage: () => <div>LoginPage</div>,
  MainPage: () => <div>MainPage</div>,
  NotFoundPage: () => <div>NotFoundPage</div>,
  OrdersPage: () => <div>OrdersPage</div>,
  QuestionaryPage: () => <div>QuestionaryPage</div>,
  RegisterPage: () => <div>RegisterPage</div>,
  UserPage: () => <div>UserPage</div>,
  UsersCatalogPage: () => <div>UsersCatalogPage</div>,
  WorkoutPage: () => <div>WorkoutPage</div>,
  WorkoutsCatalogPage: () => <div>WorkoutsCatalogPage</div>,
}));

vi.mock('react-slick', () => ({
  default: vi.fn(),
}));

describe('Component: App', () => {
  let mockHistory: MemoryHistory;
  let preparedComponent: JSX.Element;
  const mockSlice: AppData = {
    ...makeFakeAppDataSlice(),
    authStatus: AuthorizationStatus.Auth,
  };
  const mockStore = {
    APP_DATA: mockSlice,
  };
  const { withStoreComponent } = withStore(<App />, mockStore);

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    preparedComponent = withHistory(withStoreComponent, mockHistory);
  });

  it('should render IntroPage when user navigates to AppRoute.Root', () => {
    mockHistory.push(AppRoute.Root);

    render(preparedComponent);

    expect(screen.getByText('IntroPage')).toBeInTheDocument();
  });

  it('should render LoginPage when user navigates to AppRoute.Login', () => {
    mockHistory.push(AppRoute.Login);

    render(preparedComponent);

    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('should render RegisterPage when user navigates to AppRoute.Register', () => {
    mockHistory.push(AppRoute.Register);

    render(preparedComponent);

    expect(screen.getByText('RegisterPage')).toBeInTheDocument();
  });

  it('should render QuestionaryPage when user navigates to AppRoute.Questionary', () => {
    mockHistory.push(AppRoute.Questionary);

    render(preparedComponent);

    expect(screen.getByText('QuestionaryPage')).toBeInTheDocument();
  });

  it('should render MainPage when user navigates to AppRoute.Main', () => {
    mockHistory.push(AppRoute.Main);

    render(preparedComponent);

    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });

  it('should render AccountPage when user navigates to AppRoute.Account', () => {
    mockHistory.push(AppRoute.Account);

    render(preparedComponent);

    expect(screen.getByText('AccountPage')).toBeInTheDocument();
  });

  it('should render FriendsPage when user navigates to AppRoute.Friends', () => {
    mockHistory.push(AppRoute.Friends);

    render(preparedComponent);

    expect(screen.getByText('FriendsPage')).toBeInTheDocument();
  });

  it('should render BalancePage when user navigates to AppRoute.Balance', () => {
    mockHistory.push(AppRoute.Balance);

    render(preparedComponent);

    expect(screen.getByText('BalancePage')).toBeInTheDocument();
  });

  it('should render CoachWorkoutsPage when user navigates to AppRoute.CoachWorkouts', () => {
    mockHistory.push(AppRoute.CoachWorkouts);

    render(preparedComponent);

    expect(screen.getByText('CoachWorkoutsPage')).toBeInTheDocument();
  });

  it('should render OrdersPage when user navigates to AppRoute.Orders', () => {
    mockHistory.push(AppRoute.Orders);

    render(preparedComponent);

    expect(screen.getByText('OrdersPage')).toBeInTheDocument();
  });

  it('should render CreateWorkoutPage when user navigates to AppRoute.CreateWorkout', () => {
    mockHistory.push(AppRoute.CreateWorkout);

    render(preparedComponent);

    expect(screen.getByText('CreateWorkoutPage')).toBeInTheDocument();
  });

  it('should render UsersCatalogPage when user navigates to AppRoute.Users', () => {
    mockHistory.push(AppRoute.Users);

    render(preparedComponent);

    expect(screen.getByText('UsersCatalogPage')).toBeInTheDocument();
  });

  it('should render UserPage when user navigates to AppRoute.Users/userId', () => {
    mockHistory.push(`${AppRoute.Users}/userId`);

    render(preparedComponent);

    expect(screen.getByText('UserPage')).toBeInTheDocument();
  });

  it('should render WorkoutsCatalogPage when user navigates to AppRoute.Workouts', () => {
    mockHistory.push(AppRoute.Workouts);

    render(preparedComponent);

    expect(screen.getByText('WorkoutsCatalogPage')).toBeInTheDocument();
  });

  it('should render WorkoutPage when user navigates to AppRoute.Workouts/workoutId', () => {
    mockHistory.push(`${AppRoute.Workouts}/:workoutId`);

    render(preparedComponent);

    expect(screen.getByText('WorkoutPage')).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigates by not existed route', () => {
    mockHistory.push('/not-exists');

    render(preparedComponent);

    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });
});
