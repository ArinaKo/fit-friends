import { useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { getUserCertificates } from '../../store';
import { SliderButtons } from '../index';
import { SliderConfig, SlidesAmount } from '../../const';
import Slider from 'react-slick';
import Certificate from './certificate.component';

function CoachCertificates(): JSX.Element {
  const certificates = useAppSelector(getUserCertificates);
  const settings = {
    ...SliderConfig,
    className: 'popup__slider-list',
    slidesToShow: SlidesAmount.CoachCertificates,
  };
  const sliderRef = useRef<Slider>(null);

  return (
    <div className="popup__content popup__content--certificates" data-testid="coachCertificates">
      <div className="popup__slider-buttons">
        <SliderButtons
          sliderRef={sliderRef}
          slidesAmount={certificates.length}
          slidesToShow={SlidesAmount.CoachCertificates}
          styleClass="popup__slider-btn"
        />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {certificates.map((certificate) => (
          <Certificate file={certificate} key={`pdf-${certificate.hashName}`} />
        ))}
      </Slider>
    </div>
  );
}

export default CoachCertificates;
