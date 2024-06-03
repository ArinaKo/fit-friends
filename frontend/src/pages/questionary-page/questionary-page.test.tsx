import { render, screen } from '@testing-library/react';
import QuestionaryPage from './questionary-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';
import { AppData } from '../../types';
import { AuthorizationStatus } from '../../const';

vi.mock('../../components', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  QuestionaryForm: () => <div>QuestionaryForm</div>,
}));

describe('Component: QuestionaryPage', () => {
  it('should render correct', () => {
    const mockAppDataSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Auth,
    };
    const { withStoreComponent } = withStore(<QuestionaryPage />, {
      APP_DATA: mockAppDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('QuestionaryForm')).toBeInTheDocument();
  });

  it('should render ui blocker when authorization status is unkown', () => {
    const mockAppDataSlice: AppData = {
      ...makeFakeAppDataSlice(),
      authStatus: AuthorizationStatus.Unknown,
    };
    const { withStoreComponent } = withStore(<QuestionaryPage />, {
      APP_DATA: mockAppDataSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });
});
