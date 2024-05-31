import { render, screen } from '@testing-library/react';
import NewFeatureFiller from './new-feature-filler.component';

describe('Component: NewFeatureFiller', () => {
  it('should render correct', () => {
    const expectedText = 'Скоро тут будет интересно';

    render(<NewFeatureFiller />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
