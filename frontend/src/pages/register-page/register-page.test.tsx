import { render, screen } from '@testing-library/react';
import RegisterPage from './register-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';
import { AuthorizationStatus } from '../../const';
import { AppData } from '../../types';

vi.mock('../../components', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  RegisterForm: () => <div>RegisterForm</div>,
}));

describe('Component: RegisterPage', () => {
  it('should render correct', () => {
    const mockAppDataSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.NoAuth,
    };
    const { withStoreComponent } = withStore(<RegisterPage />, {
      APP_DATA: mockAppDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('RegisterForm')).toBeInTheDocument();
  });

  it('should render ui blocker when authorization status is unkown', () => {
    const mockAppDataSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Unknown,
    };
    const { withStoreComponent } = withStore(<RegisterPage />, {
      APP_DATA: mockAppDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});
