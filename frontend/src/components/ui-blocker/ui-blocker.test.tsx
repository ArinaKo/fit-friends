import { render, screen } from '@testing-library/react';
import UIBlocker from './ui-blocker.component';

describe('Component: UIBlocker', () => {
  it('should render correct', () => {
    const expectedText = /Loading/i;

    render(<UIBlocker />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
