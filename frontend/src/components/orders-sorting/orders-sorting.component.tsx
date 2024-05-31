import { OrdersSortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getOrdersListSortType,
  isOrdersListLoading,
  isOrdersListSortDown,
  resetCatalogPage,
  setOrdersSorting,
} from '../../store';
import cn from 'classnames';

function OrdersSorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getOrdersListSortType);
  const isSortDown = useAppSelector(isOrdersListSortDown);
  const isDisabled = useAppSelector(isOrdersListLoading);

  return (
    <div className="sort-for">
      <p>Сортировать по:</p>
      <div className="sort-for__btn-container">
        <button
          className={cn('btn-filter-sort', {
            'btn-filter-sort--active': sortType === OrdersSortType.Sum,
          })}
          type="button"
          disabled={isDisabled}
          onClick={() => {
            dispatch(resetCatalogPage());
            dispatch(setOrdersSorting(OrdersSortType.Sum));
          }}
          data-testid="sumSorting"
        >
          <span>Сумме</span>
          <svg width={16} height={10} aria-hidden="true">
            <use
              xlinkHref={
                !isSortDown && sortType === OrdersSortType.Sum
                  ? '#icon-sort-down'
                  : '#icon-sort-up'
              }
            />
          </svg>
        </button>
        <button
          className={cn('btn-filter-sort', {
            'btn-filter-sort--active': sortType === OrdersSortType.Count,
          })}
          type="button"
          disabled={isDisabled}
          onClick={() => {
            dispatch(resetCatalogPage());
            dispatch(setOrdersSorting(OrdersSortType.Count));
          }}
          data-testid="countSorting"
        >
          <span>Количеству</span>
          <svg width={16} height={10} aria-hidden="true">
            <use
              xlinkHref={
                !isSortDown && sortType === OrdersSortType.Count
                  ? '#icon-sort-down'
                  : '#icon-sort-up'
              }
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default OrdersSorting;
