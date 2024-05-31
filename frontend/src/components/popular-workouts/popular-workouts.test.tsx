import { render, screen } from '@testing-library/react';
import {
  makeFakeMainDataSlice,
  makeFakeWorkout,
  withHistory,
  withStore,
} from '../../utils';
import PopularWorkouts from './popular-workouts.component';
import { MainData } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderButtons: () => (
    <div data-testid="sliderButtons">SliderButtons component</div>
  ),
  WorkoutCard: () => <div data-testid="workoutCard">WorkoutCard component</div>,
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: PopularWorkouts', () => {
  it('should render correct', () => {
    const expectedText1 = 'Популярные тренировки';
    const expectedText2 = 'Смотреть все';
    const buttonsTestId = 'sliderButtons';
    const sliderTestId = 'slider';
    const itemTestId = 'workoutCard';
    const mockSlice: MainData = {
      ...makeFakeMainDataSlice(),
      popularWorkouts: [makeFakeWorkout()],
    };
    const { withStoreComponent } = withStore(<PopularWorkouts />, {
      MAIN_DATA: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(buttonsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId)).toHaveLength(1);
  });
});
