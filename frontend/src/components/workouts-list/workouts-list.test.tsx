import { render, screen } from '@testing-library/react';
import WorkoutsList from './workouts-list.component';
import {
  makeFakeWorkoutsListSlice,
  makeFakeCatalogDataSlice,
  withStore,
  makeFakeWorkout,
} from '../../utils';
import { CatalogData, WorkoutsList as SliceType } from '../../types';
import { WorkoutsListType } from './workouts-list';

vi.mock('../index', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  CatalogButtons: () => (
    <div data-testid="catalogButtons">CatalogButtons component</div>
  ),
  WorkoutCard: () => <div data-testid="workoutCard">WorkoutCard component</div>,
}));

describe('Component: WorkoutsList', () => {
  const catalogSlice: CatalogData = {
    ...makeFakeCatalogDataSlice(),
    currentPage: 1,
    totalPages: 2,
  };

  it('should render correct', () => {
    const listElementTestId = 'workoutsList';
    const itemElementTestId = 'workoutCard';
    const buttonsElementTestId = 'catalogButtons';
    const usersSlice: SliceType = {
      ...makeFakeWorkoutsListSlice(),
      workouts: [makeFakeWorkout()],
    };
    const { withStoreComponent } = withStore(
      <WorkoutsList type={WorkoutsListType.WorkoutsCatalog} />,
      {
        WORKOUTS_LIST: usersSlice,
        CATALOG_DATA: catalogSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(listElementTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemElementTestId)).toHaveLength(1);
    expect(screen.getByTestId(buttonsElementTestId)).toBeInTheDocument();
  });

  it('should render correct text when list is empty', () => {
    const expectedText = 'Тренировок с выбранными характеристиками не найдено';
    const usersSlice: SliceType = {
      ...makeFakeWorkoutsListSlice(),
      workouts: [],
    };
    const { withStoreComponent } = withStore(
      <WorkoutsList type={WorkoutsListType.WorkoutsCatalog} />,
      {
        WORKOUTS_LIST: usersSlice,
        CATALOG_DATA: catalogSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const expectedText = 'Загрузка';
    const usersSlice: SliceType = {
      ...makeFakeWorkoutsListSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(
      <WorkoutsList type={WorkoutsListType.WorkoutsCatalog} />,
      {
        WORKOUTS_LIST: usersSlice,
        CATALOG_DATA: catalogSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
