import { useNavigate } from 'react-router-dom';
import { OrdersList, OrdersSorting } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isUserCoach, resetCatalogData, resetOrdersSorting, setActiveRoute } from '../../store';
import { useEffect } from 'react';
import { AppRoute, ListItemsPortion } from '../../const';

function OrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCoach = useAppSelector(isUserCoach);

  useEffect(() => {
    if (!isCoach) {
      navigate(AppRoute.Main);
      return;
    }
    dispatch(resetCatalogData(ListItemsPortion.CoachOrders));
    dispatch(resetOrdersSorting());
    dispatch(setActiveRoute(AppRoute.Orders));
  }, [navigate, dispatch, isCoach]);

  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">
          <button
            className="btn-flat btn-flat--underlined my-orders__back"
            type="button"
            onClick={() => navigate(AppRoute.Account)}
          >
            <svg width={14} height={10} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </button>
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <OrdersSorting />
          </div>
          <OrdersList />
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;
