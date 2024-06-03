import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page.component';
import { withHistory } from '../../utils';

describe('Component: NotFoundPage', () => {
  it('should render correct', () => {
    const preparedComponent = withHistory(<NotFoundPage />);

    render(preparedComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
