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
import { CatalogButtons, UIBlocker, WorkoutCard } from '../index';

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

  if (!orders.length) {
    return <p className="empty-list-text">У вас нет купленных тренировок</p>;
  }

  return (
    <>
      <ul className="my-orders__list">
        {orders.map(({ workout, count, sum }) => (
          <WorkoutCard
            workout={workout}
            ordersInfo={{ count, sum }}
            styleClass="my-orders__item"
            withButtons={false}
            key={`order-${workout.id}`}
          />
        ))}
      </ul>
      <CatalogButtons styleClass="my-orders__show-more" />
    </>
  );
}

export default OrdersList;
