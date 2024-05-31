import { render, screen } from '@testing-library/react';
import { makeFakeMainDataSlice, makeFakeWorkout, withStore } from '../../utils';
import SpecialOffers from './special-offers.component';
import { MainData } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderDots: () => <div data-testid="sliderDots">SliderDots component</div>,
  WorkoutPromo: () => (
    <div data-testid="workoutPromo">WorkoutPromo component</div>
  ),
  NewFeatureFiller: () => (
    <div data-testid="newFeatureFiller">NewFeatureFiller component</div>
  ),
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: SpecialOffers', () => {
  it('should render correct', () => {
    const expectedText = 'Специальные предложения';
    const buttonsTestId = 'sliderDots';
    const sliderTestId = 'slider';
    const itemTestId = 'workoutPromo';
    const fillerTestId = 'newFeatureFiller';
    const mockSlice: MainData = {
      ...makeFakeMainDataSlice(),
      specialWorkouts: [makeFakeWorkout()],
    };
    const { withStoreComponent } = withStore(<SpecialOffers />, {
      MAIN_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(buttonsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId)).toHaveLength(1);
    expect(screen.getByTestId(fillerTestId)).toBeInTheDocument();
  });
});
