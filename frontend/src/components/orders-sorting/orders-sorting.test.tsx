import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  extractActionsTypes,
  makeFakeOrdersListSlice,
  withStore,
} from '../../utils';
import OrdersSorting from './orders-sorting.component';
import { OrdersList } from '../../types';
import { resetCatalogPage, setOrdersSorting } from '../../store';
import { OrdersSortType } from '../../const';

describe('Component: OrdersSorting', () => {
  const sumButtonTestId = 'sumSorting';
  const countButtonTestId = 'countSorting';

  it('should render correct', () => {
    const expectedText1 = 'Сортировать по:';
    const expectedText2 = 'Сумме';
    const expectedText3 = 'Количеству';
    const mockSlice: OrdersList = {
      ...makeFakeOrdersListSlice(),
    };
    const { withStoreComponent } = withStore(<OrdersSorting />, {
      ORDERS_LIST: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByTestId(sumButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(countButtonTestId)).toBeInTheDocument();
  });

  it('should dispatch "resetCatalogPage" and "setOrdersSorting" when user click button', async () => {
    const mockSlice: OrdersList = makeFakeOrdersListSlice();
    const { withStoreComponent, mockStore } = withStore(<OrdersSorting />, {
      ORDERS_LIST: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(sumButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      resetCatalogPage.type,
      setOrdersSorting.type,
    ]);
  });

  it('should render active sorting button with extra class', () => {
    const mockSlice: OrdersList = {
      ...makeFakeOrdersListSlice(),
      sorting: {
        directionDown: true,
        type: OrdersSortType.Sum,
      },
    };
    const { withStoreComponent } = withStore(<OrdersSorting />, {
      ORDERS_LIST: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(sumButtonTestId)).toHaveClass(
      'btn-filter-sort--active',
    );
    expect(screen.getByTestId(countButtonTestId)).not.toHaveClass(
      'btn-filter-sort--active',
    );
  });
});
