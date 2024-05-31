import { render, screen } from '@testing-library/react';
import EntryLayout from './entry-layout.component';

describe('Component: EntryLayout', () => {
  it('should render correct', () => {
    const mainElementTestId = 'mainElement';
    const logoTestId = 'backgroundLogo';

    render(<EntryLayout />);

    expect(screen.getByTestId(mainElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(logoTestId)).toBeInTheDocument();
  });
});
