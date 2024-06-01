import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeWorkoutFormSlice,
  withStore,
} from '../../utils';
import SpecialStatus from './special-status.component';
import { WorkoutForm } from '../../types';
import userEvent from '@testing-library/user-event';
import { setIsSpecial } from '../../store';

describe('Component: SpecialStatus', () => {
  const buttonTestId = 'discountButton';

  it('should render correct with status "true"', () => {
    const expectedText = 'Сделать скидку 10%';
    const notExpectedText = 'Отменить скидку';
    const mockSlice: WorkoutForm = {
      ...makeFakeWorkoutFormSlice(),
      isSpecial: false,
    };
    const { withStoreComponent } = withStore(<SpecialStatus />, {
      WORKOUT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });

  it('should render correct with status "false"', () => {
    const expectedText = 'Отменить скидку';
    const notExpectedText = 'Сделать скидку 10%';
    const mockSlice: WorkoutForm = {
      ...makeFakeWorkoutFormSlice(),
      isSpecial: true,
    };
    const { withStoreComponent } = withStore(<SpecialStatus />, {
      WORKOUT_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });

  it('should dispatch "setIsSpecial" when user click button', async () => {
    const mockSlice: WorkoutForm = {
      ...makeFakeWorkoutFormSlice(),
      isSpecial: true,
    };
    const { withStoreComponent, mockStore } = withStore(<SpecialStatus />, {
      WORKOUT_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(buttonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setIsSpecial.type]);
  });
});
