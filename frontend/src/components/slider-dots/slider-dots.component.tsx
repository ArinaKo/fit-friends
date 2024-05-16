import { useState } from 'react';
import Slider from 'react-slick';
import cn from 'classnames';

type SliderControlsProps = {
  sliderRef: React.RefObject<Slider>;
  slidesAmount: number;
  styleClass: string;
};

function SliderControls({
  sliderRef,
  slidesAmount,
  styleClass,
}: SliderControlsProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={`${styleClass}__slider-dots`}>
      {Array.from({ length: slidesAmount }).map((_, index) => (
        <button
          className={cn(`${styleClass}__slider-dot`, {
            [`${styleClass}__slider-dot--active`]: currentSlide === index,
          })}
          aria-label={`${index + 1} слайд`}
          key={`dot-${index + 1}`}
          onClick={() => {
            setCurrentSlide(index);
            sliderRef.current?.slickGoTo(index);
          }}
        />
      ))}
    </div>
  );
}

export default SliderControls;
