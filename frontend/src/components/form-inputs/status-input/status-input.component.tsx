import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUserFormStatus, isUserFormDataSending, setStatus } from '../../../store';
import { StatusInputMode, StatusInputModeDiffs } from './status-input.mode';

type StatusInputProps = {
  mode: StatusInputMode;
};

function StatusInput({ mode }: StatusInputProps): JSX.Element {
  const {
    iconStyleClass,
    labelStyleClass,
    labelText,
  } = StatusInputModeDiffs[mode];
  const dispatch = useAppDispatch();
  const status = useAppSelector(getUserFormStatus);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <label>
      <input
        type="checkbox"
        name="status"
        checked={status}
        disabled={isDisabled}
        onChange={() => {
          dispatch(setStatus(!status));
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
