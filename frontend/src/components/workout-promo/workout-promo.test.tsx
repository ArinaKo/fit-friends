import { render, screen } from '@testing-library/react';
import { makeFakeWorkout, withHistory } from '../../utils';
import WorkoutPromo from './workout-promo.component';

describe('Component: WorkoutPromo', () => {
  it('should render correct', () => {
    const expectedAltText = 'Фотография тренировки';
    const expectedText2 = '90 ₽';
    const expectedText3 = '100 ₽';
    const mockWorkout = {
      ...makeFakeWorkout(),
      price: 90,
    };
    const preparedComponent = withHistory(
      <WorkoutPromo workout={mockWorkout} />,
    );

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByText(mockWorkout.title)).toBeInTheDocument();
  });
});
