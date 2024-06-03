import { render, screen } from '@testing-library/react';
import WorkoutsCatalogPage from './workouts-catalog-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  WorkoutsFilter: () => <div>WorkoutsFilter</div>,
  WorkoutsList: () => <div>WorkoutsList</div>,
  WorkoutsFilterType: vi.fn(),
  WorkoutsListType: vi.fn(),
}));

describe('Component: WorkoutsCatalogPage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<WorkoutsCatalogPage />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Каталог тренировок')).toBeInTheDocument();
    expect(screen.getByText('Фильтры')).toBeInTheDocument();
    expect(screen.getByText('WorkoutsFilter')).toBeInTheDocument();
    expect(screen.getByText('WorkoutsList')).toBeInTheDocument();
  });
});
