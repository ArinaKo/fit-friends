import { render, screen } from '@testing-library/react';
import Rating from './rating.component';
import { makeFakeWorkoutInfoSlice, withStore } from '../../utils';
import { WorkoutInfo } from '../../types';

describe('Component: Rating', () => {
  it('should render correct', () => {
    const expectedText = 'Рейтинг';
    const expectedValue = 5;
    const mockSlice: WorkoutInfo = {
      ...makeFakeWorkoutInfoSlice(),
      rating: expectedValue,
    };
    const { withStoreComponent } = withStore(<Rating />, {
      WORKOUT_INFO: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  });
});
