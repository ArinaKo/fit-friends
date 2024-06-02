import { render, screen } from '@testing-library/react';
import { makeFakeWorkoutsListSlice, withStore } from '../../utils';
import WorkoutsFilter from './workouts-filter.component';
import { WorkoutDuration, WorkoutType, WorkoutsSortType } from '../../const';
import { WorkoutsList } from '../../types';
import { WorkoutsFilterType } from './workouts-filter';

describe('Component: WorkoutsFilter', () => {
  const mockWorkoutsListSlice = makeFakeWorkoutsListSlice();

  it('should render correct when type is coach workouts', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
    };
    const { withStoreComponent } = withStore(
      <WorkoutsFilter type={WorkoutsFilterType.CoachWorkouts} />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Калории')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('Длительность')).toBeInTheDocument();
  });

  it('should render correct when type is workouts catalog', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
    };
    const { withStoreComponent } = withStore(
      <WorkoutsFilter type={WorkoutsFilterType.WorkoutsCatalog} />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Калории')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('Тип')).toBeInTheDocument();
    expect(screen.getByText('Сортировка')).toBeInTheDocument();
  });

  it('should display correct values when type is coach workouts', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        price: {
          min: 300,
          max: 500,
        },
        calories: {
          min: 100,
          max: 150,
        },
        rating: {
          min: 2,
          max: 4,
        },
        duration: [WorkoutDuration.Extra],
        types: [],
        sorting: undefined,
      },
    };
    const { withStoreComponent } = withStore(
      <WorkoutsFilter type={WorkoutsFilterType.CoachWorkouts} />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getAllByDisplayValue(300)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(500)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(100)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(150)).toHaveLength(2);
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(4)).toBeInTheDocument();
    expect(screen.getByLabelText('80 мин - 100 мин')).toBeChecked();
  });

  it('should display correct values when type is coach workouts', () => {
    const mockSlice: WorkoutsList = {
      ...mockWorkoutsListSlice,
      filter: {
        price: {
          min: 300,
          max: 500,
        },
        calories: {
          min: 100,
          max: 150,
        },
        rating: {
          min: 2,
          max: 4,
        },
        duration: [],
        types: [WorkoutType.Running],
        sorting: WorkoutsSortType.Free,
      },
    };
    const { withStoreComponent } = withStore(
      <WorkoutsFilter type={WorkoutsFilterType.WorkoutsCatalog} />,
      {
        WORKOUTS_LIST: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getAllByDisplayValue(300)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(500)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(100)).toHaveLength(2);
    expect(screen.getAllByDisplayValue(150)).toHaveLength(2);
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(4)).toBeInTheDocument();
    expect(screen.getByLabelText('бег')).toBeChecked();
    expect(screen.getByLabelText('Бесплатно')).toBeChecked();
  });
});
