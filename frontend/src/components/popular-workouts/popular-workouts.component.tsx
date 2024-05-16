import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { AppRoute, SliderConfig, SlidesAmount } from '../../const';
import { SliderButtons, WorkoutCard } from '../index';
import { useAppSelector } from '../../hooks';
import { getPopularWorkouts } from '../../store';
import Slider from 'react-slick';

function PopularWorkouts(): JSX.Element {
  const navigate = useNavigate();
  const workouts = useAppSelector(getPopularWorkouts);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    ...SliderConfig,
    className: 'popular-trainings__list',
    slidesToShow: SlidesAmount.PopularWorkouts,
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={() => navigate(AppRoute.Workouts)}
            >
              <span>Смотреть все</span>
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <SliderButtons
                sliderRef={sliderRef}
                slidesAmount={workouts.length}
                slidesToShow={SlidesAmount.PopularWorkouts}
                styleClass="popular-trainings__control"
              />
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {workouts.map((workout) => (
              <WorkoutCard
                workout={workout}
                styleClass="popular-trainings__item"
                key={`workout-${workout.id}`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default PopularWorkouts;
