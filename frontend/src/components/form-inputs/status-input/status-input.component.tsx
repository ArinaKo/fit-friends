import { useAppDispatch, useAppSelector } from '../../../hooks';
import { isUserFormDataSending } from '../../../store';
import { StatusInputMode, StatusInputModeDiffs } from './status-input.mode';

type StatusInputProps = {
  mode: StatusInputMode;
};

function StatusInput({ mode }: StatusInputProps): JSX.Element {
  const {
    iconStyleClass,
    labelStyleClass,
    labelText,
    valueSelector,
    setValue,
  } = StatusInputModeDiffs[mode];
  const dispatch = useAppDispatch();
  const status = useAppSelector(valueSelector);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <label>
      <input
        type="checkbox"
        name="status"
        checked={status}
        disabled={isDisabled}
        onChange={() => {
          dispatch(setValue(!status));
        }}
      />
      <span className={iconStyleClass}>
        <svg width={9} height={6} aria-hidden="true">
          <use xlinkHref="#arrow-check" />
        </svg>
      </span>
      <span className={labelStyleClass}>{labelText}</span>
    </label>
  );
}

export default StatusInput;
