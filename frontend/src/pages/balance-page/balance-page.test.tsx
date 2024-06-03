import { render, screen } from '@testing-library/react';
import BalancePage from './balance-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  BalancesSorting: () => <div>BalancesSorting</div>,
  BalancesList: () => <div>BalancesList</div>,
}));

describe('Component: BalancePage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<BalancePage />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Мои покупки')).toBeInTheDocument();
    expect(screen.getByText('BalancesSorting')).toBeInTheDocument();
    expect(screen.getByText('BalancesList')).toBeInTheDocument();
  });
});
