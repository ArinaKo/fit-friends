import { useEffect, useRef } from 'react';
import { SliderConfig, SlidesAmount } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCoachDataAction,
  getUserWorkouts,
  isCoachInfoActual,
  isCoachWorkoutsLoading,
} from '../../store';
import {
  WorkoutCard,
  WorkoutCardType,
  SliderControls,
  SliderControlsType,
  UIBlocker,
} from '../index';
import Slider from 'react-slick';

function UserInfoWorkouts(): JSX.Element {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(getUserWorkouts);
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
            type={WorkoutCardType.UserInfoWorkout}
            key={`workout-${workout.id}`}
          />
        ))}
      </Slider>
      <form className="user-card__training-form">
        <button className="btn user-card__btn-training" type="button">
          Хочу персональную тренировку
        </button>
        <div className="user-card__training-check">
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input
                type="checkbox"
                defaultValue="user-agreement-1"
                name="user-agreement"
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
      </form>
    </div>
  );
}

export default UserInfoWorkouts;
