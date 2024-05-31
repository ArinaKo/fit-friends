import { render, screen } from '@testing-library/react';
import CaloriesPlan from './calories-plan.component';
import { makeFakeUserDataSlice, withStore } from '../../utils';
import { UserData } from '../../types';

describe('Component: CaloriesPlan', () => {
  it('should render correct', () => {
    const expectedText1 = 'План на день, ккал';
    const expectedText2 = 'План на неделю, ккал';
    const mockSlice: UserData = {
      ...makeFakeUserDataSlice(),
      caloriesPerDay: 7,
    };
    const expectedValue1 = 7;
    const expectedValue2 = 49;
    const { withStoreComponent } = withStore(<CaloriesPlan />, {
      USER_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByLabelText(expectedText1)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedText2)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedValue1)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedValue2)).toBeInTheDocument();
  });
});
