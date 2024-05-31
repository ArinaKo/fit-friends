import { render, screen } from '@testing-library/react';
import BalancesList from './balances-list.component';
import {
  makeFakeBalance,
  makeFakeBalancesListSlice,
  makeFakeCatalogDataSlice,
  withStore,
} from '../../utils';
import { CatalogData, BalancesList as SliceType } from '../../types';

vi.mock('../index', () => ({
  default: vi.fn(),
  UIBlocker: () => <div>Загрузка</div>,
  CatalogButtons: () => (
    <div data-testid="catalogButtons">CatalogButtons component</div>
  ),
  WorkoutCard: () => <div data-testid="workoutCard">WorkoutCard component</div>,
}));

describe('Component: BalancesList', () => {
  const catalogSlice: CatalogData = {
    ...makeFakeCatalogDataSlice(),
    currentPage: 1,
    totalPages: 2,
  };

  it('should render correct', () => {
    const listElementTestId = 'balancesList';
    const itemElementTestId = 'workoutCard';
    const buttonsElementTestId = 'catalogButtons';
    const balancesSlice: SliceType = {
      ...makeFakeBalancesListSlice(),
      balances: [makeFakeBalance()],
    };
    const { withStoreComponent } = withStore(<BalancesList />, {
      BALANCES_LIST: balancesSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(listElementTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(itemElementTestId)).toHaveLength(1);
    expect(screen.getByTestId(buttonsElementTestId)).toBeInTheDocument();
  });

  it('should render correct text when balances list is empty and flag "isOnlyActive" is false', () => {
    const expectedText = 'У вас нет купленных тренировок';
    const balancesSlice: SliceType = {
      ...makeFakeBalancesListSlice(),
      balances: [],
      isOnlyActive: false,
    };
    const { withStoreComponent } = withStore(<BalancesList />, {
      BALANCES_LIST: balancesSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correct text when balances list is empty and flag "isOnlyActive" is false', () => {
    const expectedText = 'У вас нет активных купленных тренировок';
    const balancesSlice: SliceType = {
      ...makeFakeBalancesListSlice(),
      balances: [],
      isOnlyActive: true,
    };
    const { withStoreComponent } = withStore(<BalancesList />, {
      BALANCES_LIST: balancesSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ui blocker when data is loading', () => {
    const expectedText = 'Загрузка';
    const balancesSlice: SliceType = {
      ...makeFakeBalancesListSlice(),
      isDataLoading: true,
    };
    const { withStoreComponent } = withStore(<BalancesList />, {
      BALANCES_LIST: balancesSlice,
      CATALOG_DATA: catalogSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
