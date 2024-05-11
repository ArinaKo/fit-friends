import { SALE_PERCENT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getWorkoutFormSpecialFlag, setIsSpecial } from '../../store';

function SpecialStatus(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getWorkoutFormSpecialFlag);

  return (
    <button
      className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
      type="button"
      onClick={() => {
        dispatch(setIsSpecial());
      }}
    >
      <svg width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-discount"></use>
      </svg>
      <span>{status ? 'Отменить скидку' : `Сделать скидку ${SALE_PERCENT}%`}</span>
    </button>
  );
}

export default SpecialStatus;
