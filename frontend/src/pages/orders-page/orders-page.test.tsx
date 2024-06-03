import { render, screen } from '@testing-library/react';
import OrdersPage from './orders-page.component';
import { withStore, withHistory, makeFakeAppDataSlice } from '../../utils';

vi.mock('../../components', () => ({
  default: vi.fn(),
  OrdersSorting: () => <div>OrdersSorting</div>,
  OrdersList: () => <div>OrdersList</div>,
}));

describe('Component: OrdersPage', () => {
  it('should render correct', () => {
    const { withStoreComponent } = withStore(<OrdersPage />, {
      APP_DATA: makeFakeAppDataSlice(),
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
    expect(screen.getByText('OrdersSorting')).toBeInTheDocument();
    expect(screen.getByText('OrdersList')).toBeInTheDocument();
  });
});
