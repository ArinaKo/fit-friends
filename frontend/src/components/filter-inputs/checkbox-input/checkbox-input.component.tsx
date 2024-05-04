import { useAppDispatch, useAppSelector } from '../../../hooks';
import { CheckboxInputType, CheckboxInputTypeDiffs } from './checkbox-input';

type CheckboxInputProps = {
  type: CheckboxInputType;
  styleClass: string;
};

function CheckboxInput({ type, styleClass }: CheckboxInputProps): JSX.Element {
  const { name, filterSelector, setFilter, optionsArray, optionsLabels } =
    CheckboxInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const filter = useAppSelector(filterSelector);

  return (
    <ul className={`${styleClass}__check-list`}>
      {optionsArray.map((option, index) => (
        <li
          className={`${styleClass}__check-list-item`}
          key={`option-${option}`}
        >
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input
                type="checkbox"
                name={name}
                checked={filter.includes(option)}
                onChange={() => {
                  dispatch(setFilter(option));
                }}
              />
              <span className="custom-toggle__icon">
                <svg width={9} height={6} aria-hidden="true">
                  <use xlinkHref="#arrow-check" />
                </svg>
              </span>
              <span className="custom-toggle__label">
                {optionsLabels ? optionsLabels[index] : option}
              </span>
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CheckboxInput;
