import { render, screen } from '@testing-library/react';
import AccountPage from './account-page.component';
import {
  withStore,
  withHistory,
  makeFakeAppDataSlice,
  makeFakeUserDataSlice,
} from '../../utils';
import { AppData, UserData } from '../../types';
import { UserRole } from '../../const';

vi.mock('../../components', () => ({
  default: vi.fn(),
  CaloriesPlan: () => <div>CaloriesPlan</div>,
  AccountCertificates: () => <div>AccountCertificates</div>,
  EditUserForm: () => <div>EditUserForm</div>,
  NewFeatureFiller: () => <div>NewFeatureFiller</div>,
  UIBlocker: () => <div>Загрузка</div>,
}));

describe('Component: AccountPage', () => {
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockUserDataSlice = makeFakeUserDataSlice();

  it('should render correct for customer', () => {
    const mockSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(<AccountPage />, {
      APP_DATA: mockSlice,
      USER_DATA: mockUserDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    expect(screen.getByText('EditUserForm')).toBeInTheDocument();
    expect(screen.getByText('CaloriesPlan')).toBeInTheDocument();
    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByText('Мои покупки')).toBeInTheDocument();
    expect(screen.getByText('NewFeatureFiller')).toBeInTheDocument();
  });

  it('should render correct for coach', () => {
    const mockSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const { withStoreComponent } = withStore(<AccountPage />, {
      APP_DATA: mockSlice,
      USER_DATA: mockUserDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    expect(screen.getByText('EditUserForm')).toBeInTheDocument();
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Создать тренировку')).toBeInTheDocument();
    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
    expect(screen.getByText('NewFeatureFiller')).toBeInTheDocument();
    expect(screen.getByText('AccountCertificates')).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const mockSlice: UserData = {
      ...mockUserDataSlice,
      isDataReady: false,
    };
    const { withStoreComponent } = withStore(<AccountPage />, {
      APP_DATA: mockAppDataSlice,
      USER_DATA: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});
