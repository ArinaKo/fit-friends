import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ChangeEvent, useEffect } from 'react';
import { TextAreaInputType, TextAreaInputTypeDiffs } from './text-area-input';
import cn from 'classnames';

type TextAreaInputProps = {
  type: TextAreaInputType;
  originalValue?: string;
  isActive?: boolean;
};

function TextAreaInput({
  type,
  originalValue,
  isActive = true,
}: TextAreaInputProps): JSX.Element {
  const {
    styleClass,
    valueSelector,
    errorSelector,
    validationFunction,
    setError,
    formStatusSelector,
    setValue,
    fieldName,
    labelText,
  } = TextAreaInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(formStatusSelector);

  useEffect(() => {
    if (originalValue && isActive) {
      dispatch(setValue(originalValue));
    }
  }, [dispatch, setValue, isActive, originalValue]);

  return (
    <div
      className={cn('custom-textarea', styleClass ?? '', {
        'custom-textarea--error': valueError,
        'custom-textarea--readonly': !isActive,
      })}
    >
      <label>
        {labelText ? (
          <span className="custom-textarea__label">{labelText}</span>
        ) : undefined}
        <textarea
          name={fieldName}
          placeholder=" "
          value={isActive ? value : originalValue}
          disabled={isDisabled || !isActive}
          onInput={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setValue(target.value));
            if (validationFunction(target.value) !== valueError) {
              dispatch(setError(validationFunction(target.value)));
            }
          }}
          data-testid="textAreaInput"
        />
        {valueError && (
          <span className="custom-textarea__error">{valueError}</span>
        )}
      </label>
    </div>
  );
}

export default TextAreaInput;
