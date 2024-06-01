import { render, screen } from '@testing-library/react';
import Hashtags from './hashtags.component';
import { makeFakeWorkoutInfoSlice, withStore } from '../../utils';
import { WorkoutInfo } from '../../types';
import { WorkoutSexFor } from '../../const';

describe('Component: Hashtags', () => {
  it('should render correct', () => {
    const mockSlice: WorkoutInfo = {
      ...makeFakeWorkoutInfoSlice(),
      type: 'type',
      userSex: WorkoutSexFor.All,
      duration: '10-30',
      calories: 150,
    };
    const expectedText1 = '#type';
    const expectedText2 = '#для_всех';
    const expectedText3 = '#10_30минут';
    const expectedText4 = '#150ккал';
    const { withStoreComponent } = withStore(<Hashtags />, {
      WORKOUT_INFO: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByText(expectedText4)).toBeInTheDocument();
  });
});
