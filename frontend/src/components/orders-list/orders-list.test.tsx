import { render, screen } from '@testing-library/react';
import OrdersList from './orders-list.component';
import {
  makeFakeOrdersListSlice,
  makeFakeCatalogDataSlice,
  withStore,
  makeFakeWorkoutOrders,
} from '../../utils';
import { CatalogData, OrdersList as SliceType } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  CatalogButtons: () => (
    <div data-testid="catalogButtons">CatalogButtons component</div>
  ),
  WorkoutCard: () => <div data-testid="workoutCard">WorkoutCard component</div>,
}));

describe('Component: OrdersList', () => {
  const catalogSlice: CatalogData = {
    ...makeFakeCatalogDataSlice(),
    currentPage: 1,
    totalPages: 2,
  };

  it('should render correct', () => {
    const listElementTestId = 'ordersList';
    const itemElementTestId = 'workoutCard';
    const buttonsElementTestId = 'catalogButtons';
    const ordersSlice: SliceType = {
      ...makeFakeOrdersListSlice(),
      orders: [makeFakeWorkoutOrders()],
    };
    const { withStoreComponent } = withStore(<OrdersList />, {
      ORDERS_LIST: ordersSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(listElementTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemElementTestId)).toHaveLength(1);
    expect(screen.getByTestId(buttonsElementTestId)).toBeInTheDocument();
  });

  it('should render correct text when list is empty', () => {
    const expectedText = 'У вас нет купленных тренировок';
    const ordersSlice: SliceType = {
      ...makeFakeOrdersListSlice(),
      orders: [],
    };
    const { withStoreComponent } = withStore(<OrdersList />, {
      ORDERS_LIST: ordersSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const expectedText = 'Загрузка';
    const ordersSlice: SliceType = {
      ...makeFakeOrdersListSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(<OrdersList />, {
      ORDERS_LIST: ordersSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
