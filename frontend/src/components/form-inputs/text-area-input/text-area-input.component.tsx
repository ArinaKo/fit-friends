import { useAppDispatch, useAppSelector } from '../../../hooks';
import { isUserFormDataSending, setUserFormError } from '../../../store';
import { ChangeEvent } from 'react';
import cn from 'classnames';
import {
  TextAreaInputType,
  TextAreaInputTypeDiffs,
} from './text-area-input';

type TextAreaInputProps = {
  type: TextAreaInputType;
};

function TextAreaInput({ type }: TextAreaInputProps): JSX.Element {
  const {
    styleClass,
    valueSelector,
    errorSelector,
    validationFunction,
    setValue,
    errorFieldName,
  } = TextAreaInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const value = useAppSelector(valueSelector);
  const valueError = useAppSelector(errorSelector);
  const isDisabled = useAppSelector(isUserFormDataSending);

  return (
    <div
      className={cn('custom-textarea', styleClass, {
        'custom-textarea--error': valueError,
      })}
    >
      <label>
        <textarea
          name="description"
          placeholder=" "
          value={value}
          disabled={isDisabled}
          onInput={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setValue(target.value));
            if (validationFunction(target.value) !== valueError) {
              dispatch(
                setUserFormError([
                  errorFieldName,
                  validationFunction(target.value),
                ])
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
