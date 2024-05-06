import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getBalancesList,
  getCatalogPage,
  isBalancesListLoading,
  isOnlyActiveBalances,
} from '../../store';
import {
  CatalogButtons,
  UIBlocker,
  WorkoutCard,
  WorkoutCardType,
} from '../index';
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

  return (
    <>
      <ul className="my-purchases__list">
        {balances.map((balance) => (
          <WorkoutCard
            type={WorkoutCardType.WorkoutBalance}
            workout={balance.workout}
            key={`workout-${balance.workout.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass="my-purchases__show-more" />
    </>
  );
}

export default BalancesList;
