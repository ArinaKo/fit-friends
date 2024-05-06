import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCatalogPage,
  getOrdersList,
  getOrdersListSortType,
  isOrdersListLoading,
  isOrdersListSortDown,
} from '../../store';
import { getCoachOrdersAction } from '../../store/api-actions';
import {
  CatalogButtons,
  UIBlocker,
  WorkoutCard,
  WorkoutCardType,
} from '../index';

function OrdersList(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrdersList);
  const page = useAppSelector(getCatalogPage);
  const sortType = useAppSelector(getOrdersListSortType);
  const sortDirection = useAppSelector(isOrdersListSortDown);
  const isDataLoading = useAppSelector(isOrdersListLoading);

  useEffect(() => {
    dispatch(getCoachOrdersAction());
  }, [dispatch, page, sortType, sortDirection]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <>
      <ul className="my-orders__list">
        {orders.map(({ workout, count, sum }) => (
          <WorkoutCard
            type={WorkoutCardType.WorkoutOrders}
            workout={workout}
            ordersInfo={{ count, sum }}
            key={`order-${workout.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass="my-orders__show-more" />
    </>
  );
}

export default OrdersList;
