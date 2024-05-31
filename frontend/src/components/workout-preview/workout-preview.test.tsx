import { render, screen } from '@testing-library/react';
import { makeFakeWorkout, withHistory } from '../../utils';
import WorkoutPreview from './workout-preview.component';

describe('Component: WorkoutPreview', () => {
  it('should render correct', () => {
    const expectedText = 'Подробнее';
    const expectedAltText = 'Фотография тренировки';
    const mockWorkout = makeFakeWorkout();
    const preparedComponent = withHistory(
      <WorkoutPreview workout={mockWorkout} styleClass="" />,
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(mockWorkout.title)).toBeInTheDocument();
  });
});
