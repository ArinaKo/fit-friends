import { useState } from 'react';
import Slider from 'react-slick';
import { SliderControlsType, SliderControlsTypeDiffs } from './slider-controls';
import cn from 'classnames';

type SliderControlsProps = {
  type: SliderControlsType;
  sliderRef: React.RefObject<Slider>;
  slidesAmount: number;
};

function SliderControls({
  type,
  sliderRef,
  slidesAmount,
}: SliderControlsProps): JSX.Element {
  const { slidesToShow, styleClass, iconSize } = SliderControlsTypeDiffs[type];
  const [firstSlide, setFirstSlide] = useState(1);
  const [lastSlide, setLastSlide] = useState(
    slidesAmount < slidesToShow ? slidesAmount : slidesToShow,
  );

  return (
    <>
      <button
        className={cn('btn-icon', styleClass)}
        type="button"
        aria-label="previous"
        disabled={firstSlide === 1}
        onClick={() => {
          setFirstSlide(firstSlide - 1);
          setLastSlide(lastSlide - 1);
          sliderRef.current?.slickPrev();
        }}
      >
        <svg width={iconSize.width} height={iconSize.height} aria-hidden="true">
          <use xlinkHref="#arrow-left" />
        </svg>
      </button>
      <button
        className={cn('btn-icon', styleClass)}
        type="button"
        aria-label="next"
        disabled={lastSlide === slidesAmount}
        onClick={() => {
          setFirstSlide(firstSlide + 1);
          setLastSlide(lastSlide + 1);
          sliderRef.current?.slickNext();
        }}
      >
        <svg width={iconSize.width} height={iconSize.height} aria-hidden="true">
          <use xlinkHref="#arrow-right" />
        </svg>
      </button>
    </>
  );
}

export default SliderControls;
