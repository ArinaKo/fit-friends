import { OrderCountValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  decreaseCount,
  getOrderCount,
  increaseCount,
  isOrderSending,
} from '../../store';
import cn from 'classnames';

function CountInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const count = useAppSelector(getOrderCount);
  const isDisabled = useAppSelector(isOrderSending);

  return (
    <div className="input-quantity">
      <button
        className={cn('btn-icon btn-icon--quantity', {
          'is-disabled': count <= OrderCountValue.Min || isDisabled,
        })}
        type="button"
        aria-label="minus"
        disabled={count <= OrderCountValue.Min || isDisabled}
        onClick={() => {
          dispatch(decreaseCount());
        }}
      >
        <svg width={12} height={12} aria-hidden="true">
          <use xlinkHref="#icon-minus" />
        </svg>
      </button>
      <div className="input-quantity__input">
        <label>
          <input type="text" value={count} size={2} readOnly />
        </label>
      </div>
      <button
        className={cn('btn-icon btn-icon--quantity', {
          'is-disabled': count >= OrderCountValue.Max || isDisabled,
        })}
        type="button"
        aria-label="plus"
        disabled={count >= OrderCountValue.Max || isDisabled}
        onClick={() => {
          dispatch(increaseCount());
        }}
      >
        <svg width={12} height={12} aria-hidden="true">
          <use xlinkHref="#icon-plus" />
        </svg>
      </button>
    </div>
  );
}

export default CountInput;
