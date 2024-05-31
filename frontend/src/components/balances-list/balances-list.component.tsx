import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getBalancesList,
  getCatalogPage,
  isBalancesListLoading,
  isOnlyActiveBalances,
} from '../../store';
import { CatalogButtons, UIBlocker, WorkoutCard } from '../index';
import { getUserBalancesAction } from '../../store/api-actions';

function BalancesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const balances = useAppSelector(getBalancesList);
  const page = useAppSelector(getCatalogPage);
  const onlyActive = useAppSelector(isOnlyActiveBalances);
  const isDataLoading = useAppSelector(isBalancesListLoading);

  useEffect(() => {
    dispatch(getUserBalancesAction());
  }, [dispatch, page, onlyActive]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  if (!balances.length) {
    return (
      <p className="empty-list-text">
        {onlyActive
          ? 'У вас нет активных купленных тренировок'
          : 'У вас нет купленных тренировок'}
      </p>
    );
  }

  return (
    <>
      <ul className="my-purchases__list" data-testid="balancesList">
        {balances.map((balance) => (
          <WorkoutCard
            workout={balance.workout}
            styleClass="my-purchases__item"
            key={`workout-${balance.workout.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass="my-purchases__show-more" />
    </>
  );
}

export default BalancesList;
