import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormStatus,
  isUserFormDataSending,
  setStatus,
} from '../../../store';
import { StatusInputMode, StatusInputModeDiffs } from './status-input.mode';

type StatusInputProps = {
  mode: StatusInputMode;
  originalValue?: boolean;
  isActive?: boolean;
};

function StatusInput({
  mode,
  originalValue,
  isActive = true,
}: StatusInputProps): JSX.Element {
  const { blockStyleClass, iconStyleClass, labelStyleClass, labelText } =
    StatusInputModeDiffs[mode];
  const dispatch = useAppDispatch();
  const status = useAppSelector(getUserFormStatus);
  const isDisabled = useAppSelector(isUserFormDataSending);

  useEffect(() => {
    if (originalValue && isActive) {
      dispatch(setStatus(originalValue));
    }
  }, [dispatch, isActive, originalValue]);

  return (
    <div className={blockStyleClass}>
      <label>
        <input
          type="checkbox"
          name="status"
          checked={isActive ? status : originalValue}
          disabled={isDisabled || !isActive}
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
    </div>
  );
}

export default StatusInput;
