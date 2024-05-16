import { useState } from 'react';
import Slider from 'react-slick';
import { ButtonsIconType, IconTypeDiffs } from './buttons-icon-type';
import cn from 'classnames';

type SliderButtonsProps = {
  sliderRef: React.RefObject<Slider>;
  slidesAmount: number;
  slidesToShow: number;
  styleClass: string;
  iconType?: ButtonsIconType;
};

function SliderButtons({
  sliderRef,
  slidesAmount,
  slidesToShow,
  styleClass,
  iconType = ButtonsIconType.Default,
}: SliderButtonsProps): JSX.Element {
  const { width, height } = IconTypeDiffs[iconType];
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
        <svg width={width} height={height} aria-hidden="true">
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
        <svg width={width} height={height} aria-hidden="true">
          <use xlinkHref="#arrow-right" />
        </svg>
      </button>
    </>
  );
}

export default SliderButtons;
