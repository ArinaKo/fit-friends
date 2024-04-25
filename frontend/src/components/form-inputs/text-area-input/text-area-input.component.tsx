import { useAppDispatch, useAppSelector } from '../../../hooks';
import { isUserFormDataSending, setUserFormError } from '../../../store';
import { ChangeEvent, useEffect } from 'react';
import cn from 'classnames';
import { TextAreaInputType, TextAreaInputTypeDiffs } from './text-area-input';

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
    setValue,
    fieldName,
    labelText,
  } = TextAreaInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(isUserFormDataSending);

  useEffect(() => {
    if (originalValue && isActive) {
      dispatch(setValue(originalValue));
    }
  }, [dispatch, setValue, isActive, originalValue]);

  return (
    <div
      className={cn('custom-textarea', styleClass, {
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
              dispatch(
                setUserFormError([
                  fieldName,
                  validationFunction(target.value),
                ]),
              );
            }
          }}
        />
        {valueError && (
          <span className="custom-textarea__error">{valueError}</span>
        )}
      </label>
    </div>
  );
}

export default TextAreaInput;
