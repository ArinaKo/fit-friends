import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, PopupKey } from '../../const';
import {
  getWorkoutAction,
  getWorkoutId,
  isUserHaveAccessToWorkout,
  isWorkoutBalanceExists,
  isWorkoutInfoLoading,
  setActiveRoute,
  setCommentForm,
  setActivePopup,
  isWorkoutInfoHasError,
} from '../../store';
import { useEffect } from 'react';
import {
  CommentForm,
  CommentsList,
  OrderForm,
  Popup,
  UIBlocker,
  WorkoutInfo,
} from '../../components';
import NotFoundPage from '../not-found-page/not-found-page.component';

function WorkoutPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const isUserHaveAccess = useAppSelector(isUserHaveAccessToWorkout);
  const isBalanceExists = useAppSelector(isWorkoutBalanceExists);
  const currentWorkoutId = useAppSelector(getWorkoutId);
  const isDataLoading = useAppSelector(isWorkoutInfoLoading);
  const hasError = useAppSelector(isWorkoutInfoHasError);

  useEffect(() => {
    if (currentWorkoutId !== workoutId && !isDataLoading) {
      dispatch(getWorkoutAction(workoutId as string));
    }
    if (!isUserHaveAccess && currentWorkoutId === workoutId) {
      navigate(AppRoute.Account);
    }
    dispatch(setActiveRoute());
  }, [
    navigate,
    dispatch,
    workoutId,
    currentWorkoutId,
    isDataLoading,
    isUserHaveAccess,
  ]);

  const handleAddCommentButtonClick = () => {
    dispatch(setCommentForm(workoutId as string));
    dispatch(setActivePopup(PopupKey.Comment));
  };

  if (isDataLoading) {
    return <UIBlocker />;
  }

  if (hasError) {
    return <NotFoundPage />;
  }

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Карточка тренировки</h1>
          <aside className="reviews-side-bar">
            <button
              className="btn-flat btn-flat--underlined reviews-side-bar__back"
              type="button"
              onClick={() => navigate(AppRoute.Workouts)}
            >
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-left" />
              </svg>
              <span>Назад</span>
            </button>
            <h2 className="reviews-side-bar__title">Отзывы</h2>
            <CommentsList />
            <button
              className="btn btn--medium reviews-side-bar__button"
              type="button"
              disabled={!isBalanceExists}
              onClick={handleAddCommentButtonClick}
            >
              Оставить отзыв
            </button>
          </aside>
          <WorkoutInfo />
        </div>
      </div>
      <Popup type={PopupKey.Comment} title="Оставить отзыв">
        <CommentForm />
      </Popup>
      <Popup type={PopupKey.Order} title="Купить тренировку">
        <OrderForm />
      </Popup>
    </section>
  );
}

export default WorkoutPage;
