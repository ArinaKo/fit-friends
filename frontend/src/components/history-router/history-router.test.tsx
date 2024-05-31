import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-router.component';

describe('Component HistoryRouter', () => {
  test('should render correctly', () => {
    const expectedText = 'innerComponent';
    const mockComponent = <span>{expectedText}</span>;
    const history = createMemoryHistory();

    render(<HistoryRouter history={history}>{mockComponent}</HistoryRouter>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
