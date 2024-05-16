import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useRef } from 'react';
import { SliderButtons, UserCard, UserCardType } from '../index';
import { AppRoute, SliderConfig, SlidesAmount } from '../../const';
import { getReadyUsers } from '../../store';
import Slider from 'react-slick';

function LookForCompany(): JSX.Element {
  const navigate = useNavigate();
  const users = useAppSelector(getReadyUsers);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    ...SliderConfig,
    className: 'look-for-company__list',
    slidesToShow: SlidesAmount.LookForCompany,
  };

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
              onClick={() => navigate(AppRoute.Users)}
            >
              <span>Смотреть все</span>
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
            <div className="look-for-company__controls">
              <SliderButtons
                sliderRef={sliderRef}
                slidesAmount={users.length}
                slidesToShow={SlidesAmount.LookForCompany}
                styleClass="look-for-company__control btn-icon--outlined"
              />
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {users.map((user) => (
              <UserCard
                user={user}
                type={UserCardType.Default}
                styleClass='look-for-company'
                isDark
                key={`user-${user.id}`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;
