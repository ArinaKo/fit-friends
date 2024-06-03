import { render, screen } from '@testing-library/react';
import UserPage from './user-page.component';
import {
  withStore,
  withHistory,
  makeFakeAppDataSlice,
  makeFakeUserInfoSlice,
} from '../../utils';
import { UserInfo } from '../../types';
import { UserRole } from '../../const';

vi.mock('../../components', () => ({
  default: vi.fn(),
  UserInfo: () => <div>UserInfo</div>,
  UserInfoWorkouts: () => <div>UserInfoWorkouts</div>,
  UIBlocker: () => <div>Загрузка</div>,
}));

describe('Component: UserPage', () => {
  it('should render correct when displayed user is customer', () => {
    const mockSlice: UserInfo = {
      ...makeFakeUserInfoSlice(),
      role: UserRole.Default,
      isDataLoading: false,
    };
    const { withStoreComponent } = withStore(<UserPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      USER_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Карточка пользователя')).toBeInTheDocument();
    expect(screen.getByText('UserInfo')).toBeInTheDocument();
    expect(screen.queryByText('UserInfoWorkouts')).not.toBeInTheDocument();
  });

  it('should render correct when displayed user is coach', () => {
    const mockSlice: UserInfo = {
      ...makeFakeUserInfoSlice(),
      role: UserRole.Coach,
      isDataLoading: false,
    };
    const { withStoreComponent } = withStore(<UserPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      USER_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Карточка пользователя')).toBeInTheDocument();
    expect(screen.getByText('UserInfo')).toBeInTheDocument();
    expect(screen.getByText('UserInfoWorkouts')).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const mockSlice: UserInfo = {
      ...makeFakeUserInfoSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(<UserPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      USER_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });

  it('should render NotFoundPage when data has error', () => {
    const mockSlice: UserInfo = {
      ...makeFakeUserInfoSlice(),
      hasError: true,
    };
    const { withStoreComponent } = withStore(<UserPage />, {
      APP_DATA: makeFakeAppDataSlice(),
      USER_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
