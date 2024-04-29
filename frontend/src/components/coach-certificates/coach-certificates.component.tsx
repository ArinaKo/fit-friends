import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserDataCertificates } from '../../store';
import CertificateCard from '../certificate-card/certificate-card.component';
import Slider from 'react-slick';
import { uploadCertificateAction } from '../../store/api-actions';

const SLIDES_TO_SHOW = 3;

function CoachCertificates(): JSX.Element {
  const dispatch = useAppDispatch();
  const certificates = useAppSelector(getUserDataCertificates);
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    centerMode: false,
    className: 'personal-account-coach__list',
    speed: 500,
    slidesToShow: SLIDES_TO_SHOW,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const sliderRef = useRef<Slider>(null);
  const [firstSlide, setFirstSlide] = useState(1);
  const [lastSlide, setLastSlide] = useState(
    certificates.length < SLIDES_TO_SHOW ? certificates.length : SLIDES_TO_SHOW,
  );

  const [editedCertificate, setEdited] = useState<null | string>(null);

  function handleFileUpload(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    if (!evt.target.files) {
      return;
    }
    dispatch(uploadCertificateAction(evt.target.files[0]));
  }

  return (
    <>
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <input
          className="visually-hidden"
          type="file"
          accept="application/pdf"
          ref={fileInput}
          onChange={handleFileUpload}
        />
        <button
          className="btn-flat btn-flat--underlined personal-account-coach__button"
          type="button"
          onClick={() => fileInput.current?.click()}
        >
          <svg width={14} height={14} aria-hidden="true">
            <use xlinkHref="#icon-import" />
          </svg>
          <span>Загрузить</span>
        </button>
        <div className="personal-account-coach__controls">
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
            disabled={firstSlide === 1}
            onClick={() => {
              setFirstSlide(firstSlide - 1);
              setLastSlide(lastSlide - 1);
              sliderRef.current?.slickPrev();
            }}
          >
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
          </button>
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="next"
            disabled={lastSlide === certificates.length}
            onClick={() => {
              setFirstSlide(firstSlide + 1);
              setLastSlide(lastSlide + 1);
              sliderRef.current?.slickNext();
            }}
          >
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#arrow-right" />
            </svg>
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {certificates.map((certificate) => (
          <div
            className="personal-account-coach__item"
            key={`pdf-${certificate.hashName}`}
          >
            <CertificateCard
              certificate={certificate}
              isActive={editedCertificate === certificate.id}
              setActive={setEdited}
            />
          </div>
        ))}
      </Slider>
    </>
  );
}

export default CoachCertificates;
