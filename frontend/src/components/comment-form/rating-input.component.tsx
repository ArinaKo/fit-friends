import { RatingValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCommentRating, isCommentSending, setRating } from '../../store';

const Ratings = Array.from({
  length: RatingValue.Max - RatingValue.Min + 1,
}).map((_, index) => index + RatingValue.Min);

function RatingInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const rating = useAppSelector(getCommentRating);
  const isDisabled = useAppSelector(isCommentSending);

  return (
    <ul className="popup__rate-list">
      {Ratings.map((value) => (
        <li className="popup__rate-item" key={`rating-${value}`}>
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label={`оценка ${value}`}
                value={value}
                disabled={isDisabled}
                checked={value === rating}
                onChange={() => {
                  dispatch(setRating(value));
                }}
              />
              <span className="popup__rate-number">{value}</span>
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RatingInput;
