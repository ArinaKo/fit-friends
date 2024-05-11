import { useNavigate } from 'react-router-dom';
import { BalancesList, BalancesSorting } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isUserCoach, resetCatalogData, setBalancesSorting } from '../../store';
import { useEffect } from 'react';
import { AppRoute, ListItemsPortion } from '../../const';

function BalancePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCoach = useAppSelector(isUserCoach);

  useEffect(() => {
    if (isCoach) {
      navigate(AppRoute.Account);
      return;
    }
    dispatch(resetCatalogData(ListItemsPortion.UserBalances));
    dispatch(setBalancesSorting());
  }, [navigate, dispatch, isCoach]);

  return (
    <section className="my-purchases">
      <div className="container">
        <div className="my-purchases__wrapper">
          <button
            className="btn-flat my-purchases__back"
            type="button"
            onClick={() => navigate(AppRoute.Account)}
          >
            <svg width={14} height={10} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </button>
          <div className="my-purchases__title-wrapper">
            <h1 className="my-purchases__title">Мои покупки</h1>
            <BalancesSorting />
          </div>
          <BalancesList />
        </div>
      </div>
    </section>
  );
}

export default BalancePage;
