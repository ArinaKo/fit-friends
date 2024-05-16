import { useEffect, useRef } from 'react';
import { SliderConfig, SlidesAmount } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  createWorkoutRequestAction,
  getCoachDataAction,
  getSubscriptionStatus,
  getUserId,
  getUserIsReady,
  getUserWorkouts,
  isCoachInfoActual,
  isCoachWorkoutsLoading,
  isUserAFriend,
  isUserCoach,
  subscribeToCoachAction,
  unsubscribeFromCoachAction,
} from '../../store';
import {
  WorkoutCard,
  SliderControls,
  SliderControlsType,
  UIBlocker,
} from '../index';
import Slider from 'react-slick';

function UserInfoWorkouts(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCoach = useAppSelector(isUserCoach);
  const userId = useAppSelector(getUserId);
  const workouts = useAppSelector(getUserWorkouts);
  const isReady = useAppSelector(getUserIsReady);
  const isFriend = useAppSelector(isUserAFriend);
  const subscriptionStatus = useAppSelector(getSubscriptionStatus);
  const isDataActual = useAppSelector(isCoachInfoActual);
  const isDataLoading = useAppSelector(isCoachWorkoutsLoading);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    ...SliderConfig,
    className: 'user-card__training-list',
    slidesToShow: SlidesAmount.CoachWorkouts,
  };

  useEffect(() => {
    if (!isDataActual) {
      dispatch(getCoachDataAction());
    }
  }, [dispatch, isDataActual]);

  if (isDataLoading) {
    return <UIBlocker />;
  }

  const handleRequestButtonClick = () => {
    dispatch(createWorkoutRequestAction(userId));
  };

  const handleSubscribeButtonClick = () => {
    if (subscriptionStatus) {
      dispatch(unsubscribeFromCoachAction(userId));
      return;
    }
    dispatch(subscribeToCoachAction(userId));
  };

  return (
    <div className="user-card__training">
      <div className="user-card__training-head">
        <h2 className="user-card__training-title">Тренировки</h2>
        <div className="user-card__training-bts">
          <SliderControls
            type={SliderControlsType.CoachWorkouts}
            sliderRef={sliderRef}
            slidesAmount={workouts.length}
          />
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {workouts.map((workout) => (
          <WorkoutCard
            workout={workout}
            styleClass='user-card__training-item'
            key={`workout-${workout.id}`}
          />
        ))}
      </Slider>
      <form className="user-card__training-form">
        {isReady && !isCoach && isFriend ? (
          <button
            className="btn user-card__btn-training"
            type="button"
            onClick={handleRequestButtonClick}
          >
            Хочу персональную тренировку
          </button>
        ) : undefined}
        {!isCoach ? (
          <div className="user-card__training-check">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  name="subscription"
                  checked={subscriptionStatus}
                  onChange={handleSubscribeButtonClick}
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">
                  Получать уведомление на почту о новой тренировке
                </span>
              </label>
            </div>
          </div>
        ) : undefined}
      </form>
    </div>
  );
}

export default UserInfoWorkouts;
