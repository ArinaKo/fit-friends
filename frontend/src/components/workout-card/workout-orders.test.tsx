import { render, screen } from '@testing-library/react';
import WorkoutOrders from './workout-orders.component';
import { makeFakeWorkoutOrders } from '../../utils';

describe('Component: WorkoutOrders', () => {
  it('should render correct', () => {
    const expectedText1 = 'Куплено тренировок';
    const expectedText2 = 'Общая сумма';
    const { count, sum } = makeFakeWorkoutOrders();

    render(<WorkoutOrders count={count} sum={sum} />);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(count)).toBeInTheDocument();
    expect(screen.getByText(sum)).toBeInTheDocument();
  });
});
