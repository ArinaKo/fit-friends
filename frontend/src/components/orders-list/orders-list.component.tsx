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

  if (!isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <>
      <ul className="my-orders__list">
        {orders.map(({ workout, sum, count }) => (
          <li className="my-orders__item" key={`order-${workout.id}`}>
            <div className="thumbnail-training">
              <WorkoutCard workout={workout} />
              <div className="thumbnail-training__total-info">
                <div className="thumbnail-training__total-info-card">
                  <svg width={32} height={32} aria-hidden="true">
                    <use xlinkHref="#icon-chart" />
                  </svg>
                  <p className="thumbnail-training__total-info-value">
                    {count}
                  </p>
                  <p className="thumbnail-training__total-info-text">
                    Куплено тренировок
                  </p>
                </div>
                <div className="thumbnail-training__total-info-card">
                  <svg width={31} height={28} aria-hidden="true">
                    <use xlinkHref="#icon-wallet" />
                  </svg>
                  <p className="thumbnail-training__total-info-value">
                    {sum}
                    <span>₽</span>
                  </p>
                  <p className="thumbnail-training__total-info-text">
                    Общая сумма
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <CatalogButtons styleClass="my-orders__show-more" />
    </>
  );
}

export default OrdersList;
