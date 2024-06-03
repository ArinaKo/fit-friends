import { render, screen } from '@testing-library/react';
import CoachWorkoutsPage from './coach-workouts-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  WorkoutsFilter: () => <div>WorkoutsFilter</div>,
  WorkoutsList: () => <div>WorkoutsList</div>,
  WorkoutsFilterType: vi.fn(),
  WorkoutsListType: vi.fn(),
}));

describe('Component: CoachWorkoutsPage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<CoachWorkoutsPage />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('фильтры')).toBeInTheDocument();
    expect(screen.getByText('WorkoutsFilter')).toBeInTheDocument();
    expect(screen.getByText('WorkoutsList')).toBeInTheDocument();
  });
});
