import { render, screen } from '@testing-library/react';
import LoginPage from './login-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';
import { AppData } from '../../types';
import { AuthorizationStatus } from '../../const';

vi.mock('../../components', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  LoginForm: () => <div>LoginForm</div>,
}));

describe('Component: LoginPage', () => {
  it('should render correct', () => {
    const mockAppDataSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Auth,
    };
    const { withStoreComponent } = withStore(<LoginPage />, {
      APP_DATA: mockAppDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
  });

  it('should render ui blocker when authorization status is unkown', () => {
    const mockAppDataSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Unknown,
    };
    const { withStoreComponent } = withStore(<LoginPage />, {
      APP_DATA: mockAppDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});
