import { SliderConfig, SlidesAmount } from '../../const';
import { NewFeatureFiller, SliderDots, WorkoutPromo } from '../index';
import { useAppSelector } from '../../hooks';
import { getSpecialWorkouts } from '../../store';
import Slider from 'react-slick';
import { useRef } from 'react';

function SpecialOffers(): JSX.Element {
  const workouts = useAppSelector(getSpecialWorkouts);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    ...SliderConfig,
    className: 'special-offers__list',
    slidesToShow: SlidesAmount.SpecialOffers,
  };
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <div className="special-offers__slider">
            <Slider ref={sliderRef} {...settings}>
              {workouts.map((workout) => (
                <WorkoutPromo
                  workout={workout}
                  key={`workout-${workout.id}`}
                />
              ))}
            </Slider>
            <SliderDots
              sliderRef={sliderRef}
              slidesAmount={workouts.length}
              styleClass="special-offers"
            />
          </div>
          <NewFeatureFiller />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
