import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ChangeEvent, useEffect } from 'react';
import cn from 'classnames';
import { isWorkoutFormDataSending } from '../../../store';
import { WorkoutInputType, WorkoutInputTypeDiffs } from './workout-input';

type WorkoutInputProps = {
  type: WorkoutInputType;
  isActive: boolean;
};

function WorkoutInput({
  type,
  isActive = false,
}: WorkoutInputProps): JSX.Element {
  const {
    valueSelector,
    editedValueSelector,
    errorSelector,
    validationFunction,
    setError,
    setValue,
    fieldName,
    isInput,
    labelText,
    inputSymbol,
    styleClassMode,
  } = WorkoutInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const editedValue = useAppSelector(editedValueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(isWorkoutFormDataSending);

  useEffect(() => {
    if (isActive) {
      dispatch(setValue(value));
    }
  }, [dispatch, setValue, isActive, value]);

  const handleFiledChange = (targetValue: string) => {
    dispatch(setValue(targetValue));
    if (validationFunction(targetValue) !== valueError) {
      dispatch(setError(validationFunction(targetValue)));
    }
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    handleFiledChange(target.value);

  const handleTextareaChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    handleFiledChange(target.value);

  return (
    <div
      className={cn(`training-info__${isInput ? 'input' : 'textarea'}`, {
        [`training-info__input--${styleClassMode ?? ''}`]: styleClassMode,
        'is-invalid': valueError,
      })}
    >
      <label>
        <span className="training-info__label">{labelText}</span>
        {isInput ? (
          <input
            type="text"
            name={fieldName}
            autoComplete="off"
            value={isActive ? editedValue : `${value}${inputSymbol ?? ''}`}
            disabled={isDisabled || !isActive}
            onChange={handleInputChange}
          />
        ) : (
          <textarea
            name={fieldName}
            placeholder=" "
            value={isActive ? editedValue : value}
            disabled={isDisabled || !isActive}
            onInput={handleTextareaChange}
          />
        )}
        {valueError ? (
          <span className="training-info__error">{valueError}</span>
        ) : undefined}
      </label>
    </div>
  );
}

export default WorkoutInput;
