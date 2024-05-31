import { render, screen } from '@testing-library/react';
import { makeFakeWorkout, withHistory } from '../../utils';
import WorkoutCard from './workout-card.component';
import { Workout } from '../../types';

vi.mock('./workout-orders.component', () => ({
  default: () => <div data-testid="workoutOrders">WorkoutOrders component</div>,
}));

describe('Component: WorkoutCard', () => {
  it('should render correct', () => {
    const expectedText1 = 'Подробнее';
    const expectedText2 = 'Отзывы';
    const expectedAltText = 'Фотография тренировки';
    const mockWorkout: Workout = {
      ...makeFakeWorkout(),
      price: 100,
    };
    const { price, title } = mockWorkout;
    const type = `#${mockWorkout.type}`;
    const calories = `#${mockWorkout.calories}ккал`;
    const preparedComponent = withHistory(
      <WorkoutCard workout={mockWorkout} styleClass="" />,
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(price)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(calories)).toBeInTheDocument();
  });

  it('should render with text "Бесплатно" when workout price is 0', () => {
    const expectedText = 'Бесплатно';
    const mockWorkout: Workout = {
      ...makeFakeWorkout(),
      price: 0,
    };
    const preparedComponent = withHistory(
      <WorkoutCard workout={mockWorkout} styleClass="" />,
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render with only one link when prop "withButtons" value is "false"', () => {
    const expectedText = 'Подробнее';
    const notExpectedText = 'Отзывы';
    const mockWorkout: Workout = {
      ...makeFakeWorkout(),
    };
    const preparedComponent = withHistory(
      <WorkoutCard workout={mockWorkout} styleClass="" withButtons={false} />,
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render with inner component "WorkoutOrders" when prop "ordersInfo" has value', () => {
    const ordersInfoTestId = 'workoutOrders';
    const mockWorkout: Workout = {
      ...makeFakeWorkout(),
    };
    const preparedComponent = withHistory(
      <WorkoutCard
        workout={mockWorkout}
        styleClass=""
        ordersInfo={{ count: 3, sum: 4 }}
      />,
    );

    render(preparedComponent);

    expect(screen.getByTestId(ordersInfoTestId)).toBeInTheDocument();
  });
});
