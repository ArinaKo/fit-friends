import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  extractActionsTypes,
  makeFakeBalancesListSlice,
  withStore,
} from '../../utils';
import BalancesSorting from './balances-sorting.component';
import { BalancesList } from '../../types';
import { resetCatalogPage, setBalancesSorting } from '../../store';

describe('Component: BalancesSorting', () => {
  it('should render correct', () => {
    const expectedLabelText = 'Только активные';
    const inputTestId = 'sortingCheckbox';
    const mockSlice: BalancesList = {
      ...makeFakeBalancesListSlice(),
      isOnlyActive: false,
    };
    const { withStoreComponent } = withStore(<BalancesSorting />, {
      BALANCES_LIST: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).not.toBeChecked();
  });

  it('should dispatch "resetCatalogPage" and "setBalancesSorting" when user check checkbox', async () => {
    const inputTestId = 'sortingCheckbox';
    const mockSlice: BalancesList = makeFakeBalancesListSlice();
    const { withStoreComponent, mockStore } = withStore(<BalancesSorting />, {
      BALANCES_LIST: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(inputTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      resetCatalogPage.type,
      setBalancesSorting.type,
    ]);
  });
});
