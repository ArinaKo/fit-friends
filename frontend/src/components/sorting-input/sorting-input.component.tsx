import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetCatalogPage } from '../../store';
import { SortingInputType, SortingInputTypeDiffs } from './sorting-input';
import cn from 'classnames';

type SortingInputProps = {
  type: SortingInputType;
  styleClass?: string;
};

function SortingInput({ type, styleClass }: SortingInputProps): JSX.Element {
  const {
    sortingSelector,
    isDisabledSelector,
    setSorting,
    optionsEnum,
    optionsLabels,
  } = SortingInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const sortingType = useAppSelector(sortingSelector);
  const isDisabled = useAppSelector(isDisabledSelector);

  return (
    <div
      className={cn('btn-radio-sort', {
        [`${styleClass ?? ''}__radio`]: styleClass,
      })}
    >
      {Object.values(optionsEnum).map((option: string) => (
        <label key={`sorting-${option}`}>
          <input
            type="checkbox"
            name="sort"
            disabled={isDisabled}
            checked={option === sortingType}
            value={option}
            onChange={() => {
              dispatch(resetCatalogPage());
              dispatch(setSorting(option));
            }}
          />
          <span className="btn-radio-sort__label">{optionsLabels[option]}</span>
        </label>
      ))}
    </div>
  );
}

export default SortingInput;
