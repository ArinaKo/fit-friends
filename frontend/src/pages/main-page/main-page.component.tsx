import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getMainPageDataAction,
  isMainDataLoading,
  isUserCoach,
  setActiveRoute,
} from '../../store';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import {
  LookForCompany,
  PopularWorkouts,
  SpecialForYou,
  SpecialOffers,
  UIBlocker,
} from '../../components';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCoach = useAppSelector(isUserCoach);
  const isDataLoading = useAppSelector(isMainDataLoading);

  useEffect(() => {
    if (isCoach) {
      navigate(AppRoute.Account);
      return;
    }
    dispatch(getMainPageDataAction());
    dispatch(setActiveRoute(AppRoute.Main));
  }, [navigate, dispatch, isCoach]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  return (
    <>
      <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
      </h1>
      <SpecialForYou />
      <SpecialOffers />
      <PopularWorkouts />
      <LookForCompany />
    </>
  );
}

export default MainPage;
