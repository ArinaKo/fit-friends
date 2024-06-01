import { render, screen } from '@testing-library/react';
import Coach from './coach.component';
import { makeFakeWorkoutInfoSlice, withHistory, withStore } from '../../utils';

describe('Component: Coach', () => {
  it('should render correct', () => {
    const expectedText = 'Тренер';
    const expectedAltText = 'Изображение тренера';
    const mockSlice = makeFakeWorkoutInfoSlice();
    const expectedValue = mockSlice.coach?.name ?? '';
    const { withStoreComponent } = withStore(<Coach />, {
      WORKOUT_INFO: mockSlice,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.queryByText(expectedValue)).toBeInTheDocument();
  });
});
