import { NameSpace } from '../../const';
import { BalancesList } from '../../types';
import { makeFakeBalance } from '../../utils';
import {
  getBalancesList,
  isBalancesListLoading,
  isOnlyActiveBalances,
} from './selectors';

describe('BalanceList selectors', () => {
  const state: BalancesList = {
    balances: [makeFakeBalance()],
    isDataLoading: true,
    isOnlyActive: false,
  };

  it('should return balances list', () => {
    const { balances } = state;

    const result = getBalancesList({ [NameSpace.BalancesList]: state });

    expect(result).toEqual(balances);
  });

  it('should return "isOnlyActive" flag', () => {
    const { isOnlyActive } = state;

    const result = isOnlyActiveBalances({ [NameSpace.BalancesList]: state });

    expect(result).toBe(isOnlyActive);
  });

  it('should return data loading status', () => {
    const { isDataLoading } = state;

    const result = isBalancesListLoading({ [NameSpace.BalancesList]: state });

    expect(result).toBe(isDataLoading);
  });
});
