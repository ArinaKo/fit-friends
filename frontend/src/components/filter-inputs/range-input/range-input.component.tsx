import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RangeInputType, RangeInputTypeDiffs } from './range-input';
import './range-input.css';
import { resetCatalogPage } from '../../../store';

type RangeInputProps = {
  type: RangeInputType;
};

function RangeInput({ type }: RangeInputProps): JSX.Element {
  const {
    name,
    withFields,
    minValueSelector,
    maxValueSelector,
    minFilterSelector,
    maxFilterSelector,
    setMinFilter,
    setMaxFilter,
  } = RangeInputTypeDiffs[type];
  const dispatch = useAppDispatch();
  const minValue = useAppSelector(minValueSelector);
  const maxValue = useAppSelector(maxValueSelector);
  const minFilter = useAppSelector(minFilterSelector);
  const maxFilter = useAppSelector(maxFilterSelector);

  const range = useRef<HTMLDivElement>(null);
  const [minInput, setMinInput] = useState<number>(minValue);
  const [maxInput, setMaxInput] = useState<number>(maxValue);

  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - minValue) / (maxValue - minValue)) * 100),
    [minValue, maxValue],
  );

  useEffect(() => {
    setMinInput(minFilter ?? minValue);
    setMaxInput(maxFilter ?? maxValue);
  }, [minValue, maxValue, minFilter, maxFilter]);

  useEffect(() => {
    const minPercent = getPercent(minFilter ?? minValue);
    const maxPercent = getPercent(maxFilter ?? maxValue);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent, minFilter, maxFilter, minValue, maxValue]);

  return (
    <>
      {withFields ? (
        <div className={`filter-${name}`}>
          <div
            className={`filter-${name}__input-text filter-${name}__input-text--min`}
          >
            <input
              type="number"
              id={`${name}-min`}
              name={`${name}-min`}
              min={0}
              max={maxValue}
              autoComplete="off"
              step={1}
              value={minInput}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                const value = Number(target.value);
                setMinInput(value);
                if (value >= minValue && value <= (maxFilter ?? maxValue)) {
                  dispatch(resetCatalogPage());
                  dispatch(setMinFilter(value));
                }
              }}
            />
            <label htmlFor={`${name}-min`}>от</label>
          </div>
          <div
            className={`filter-${name}__input-text filter-${name}__input-text--max`}
          >
            <input
              type="number"
              id={`${name}-max`}
              name={`${name}-max`}
              min={0}
              max={maxValue}
              autoComplete="off"
              step={1}
              value={maxInput}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                const value = Number(target.value);
                setMaxInput(value);
                if (value <= maxValue && value >= (minFilter ?? minValue)) {
                  dispatch(resetCatalogPage());
                  dispatch(setMaxFilter(value));
                }
              }}
            />
            <label htmlFor={`${name}-max`}>до</label>
          </div>
        </div>
      ) : undefined}
      <div className="filter-range">
        <div className="filter-range__scale">
          <div ref={range} className="filter-range__bar">
            <span className="visually-hidden">Полоса прокрутки</span>
          </div>
        </div>
        <div className="filter-range__control">
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={minFilter ?? minValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = Math.min(
                Number(event.target.value),
                maxFilter ?? maxValue - 1,
              );
              dispatch(resetCatalogPage());
              dispatch(setMinFilter(value));
            }}
            className="thumb thumb--left"
            style={
              minFilter && minFilter > maxValue - 10
                ? { zIndex: '5' }
                : undefined
            }
          />
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={maxFilter ?? maxValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = Math.max(
                Number(event.target.value),
                minFilter ?? minValue + 1,
              );
              dispatch(resetCatalogPage());
              dispatch(setMaxFilter(value));
            }}
            className="thumb thumb--right"
          />
          {withFields ? undefined : (
            <>
              <span className="filter-range__control--left">
                {minFilter ?? minValue}
              </span>
              <span className="filter-range__control--right">
                {maxFilter ?? maxValue}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RangeInput;
