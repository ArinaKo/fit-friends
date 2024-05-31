import { Link } from 'react-router-dom';
import { AppRoute, SALE_PERCENT, STATIC_URL } from '../../const';
import { Workout } from '../../types';

type WorkoutPromoProps = {
  workout: Workout;
};

function WorkoutPromo({ workout }: WorkoutPromoProps): JSX.Element {
  const { id, title, backgroundImage, description, price } = workout;

  const link = `${AppRoute.Workouts}/${id}`;

  return (
    <li className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay" />
        <div className="promo-slider__image">
          <img
            src={`${STATIC_URL}/${backgroundImage}`}
            width={1040}
            height={469}
            alt="Фотография тренировки"
          />
        </div>
        <div className="promo-slider__header">
          <Link to={link}>
            <h3 className="promo-slider__title">{title}</h3>
          </Link>
          <div className="promo-slider__logo">
            <svg width={74} height={74} aria-hidden="true">
              <use xlinkHref="#logotype" />
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">{description}</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{price} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">
              {Math.floor((price / (100 - SALE_PERCENT)) * 100)} ₽
            </p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default WorkoutPromo;
