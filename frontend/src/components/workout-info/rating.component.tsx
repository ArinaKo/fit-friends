import { useAppSelector } from '../../hooks';
import { getWorkoutRating } from '../../store';

function Rating(): JSX.Element {
  const rating = useAppSelector(getWorkoutRating);

  return (
    <div className="training-info__input training-info__input--rating">
      <label>
        <span className="training-info__label">Рейтинг</span>
        <span className="training-info__rating-icon">
          <svg width={18} height={18} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
        </span>
        <input type="number" name="rating" defaultValue={rating} disabled />
      </label>
    </div>
  );
}

export default Rating;
