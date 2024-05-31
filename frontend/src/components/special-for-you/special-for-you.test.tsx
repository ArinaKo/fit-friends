import { render, screen } from '@testing-library/react';
import { makeFakeMainDataSlice, makeFakeWorkout, withStore } from '../../utils';
import SpecialForYou from './special-for-you.component';
import { MainData } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  SliderButtons: () => (
    <div data-testid="sliderButtons">SliderButtons component</div>
  ),
  WorkoutPreview: () => (
    <div data-testid="workoutPreview">WorkoutPreview component</div>
  ),
}));

vi.mock('react-slick', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

describe('Component: SpecialForYou', () => {
  it('should render correct', () => {
    const expectedText = 'Специально подобрано для вас';
    const buttonsTestId = 'sliderButtons';
    const sliderTestId = 'slider';
    const itemTestId = 'workoutPreview';
    const mockSlice: MainData = {
      ...makeFakeMainDataSlice(),
      workoutsForUser: [makeFakeWorkout()],
    };
    const { withStoreComponent } = withStore(<SpecialForYou />, {
      MAIN_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(buttonsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sliderTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemTestId)).toHaveLength(1);
  });
});
