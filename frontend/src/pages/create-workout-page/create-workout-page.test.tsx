import { render, screen } from '@testing-library/react';
import CreateWorkoutPage from './create-workout-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  CreateWorkoutForm: () => <div>CreateWorkoutForm</div>,
}));

describe('Component: CreateWorkoutPage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<CreateWorkoutPage />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Создание тренировки')).toBeInTheDocument();
    expect(screen.getByText('CreateWorkoutForm')).toBeInTheDocument();
  });
});
