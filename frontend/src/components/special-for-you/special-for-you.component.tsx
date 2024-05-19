import { useAppSelector } from '../../hooks';
import { getWorkoutsForUser } from '../../store';
import { useRef } from 'react';
import { SliderConfig, SlidesAmount } from '../../const';
import { SliderButtons, WorkoutPreview } from '../index';
import Slider from 'react-slick';

function SpecialForYou(): JSX.Element {
  const workouts = useAppSelector(getWorkoutsForUser);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    ...SliderConfig,
    className: 'special-for-you__list',
    slidesToShow: SlidesAmount.SpecialForYou,
  };

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <SliderButtons
                sliderRef={sliderRef}
                slidesAmount={workouts.length}
                slidesToShow={SlidesAmount.SpecialForYou}
                styleClass="special-for-you__control"
              />
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {workouts.map((workout) => (
              <WorkoutPreview
                workout={workout}
                styleClass="special-for-you__item"
                key={`special-for-you-${workout.id}`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYou;
