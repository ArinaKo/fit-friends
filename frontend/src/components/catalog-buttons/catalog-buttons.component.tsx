import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CatalogButtonsType, CatalogButtonsTypeDiffs } from './catalog-buttons';

export interface CatalogButtonsProps {
  type: CatalogButtonsType;
  styleClass: string;
}

function CatalogButtons({ type, styleClass }: CatalogButtonsProps) {
  const { increasePageAction, isAllSelector, isScrollActiveSelector } =
    CatalogButtonsTypeDiffs[type];
  const dispatch = useAppDispatch();
  const isAll = useAppSelector(isAllSelector);
  const isScrollActive = useAppSelector(isScrollActiveSelector);
  return (
    <div className={cn('show-more', styleClass)}>
      <button
        className={cn('btn show-more__button show-more__button--more', {
          'show-more__button--not-active': isAll,
        })}
        type="button"
        onClick={() => dispatch(increasePageAction())}
      >
        Показать еще
      </button>
      <button
        className={cn('btn show-more__button show-more__button--to-top', {
          'show-more__button--not-active': !isAll || isScrollActive,
        })}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Вернуться в начало
      </button>
    </div>
  );
}

export default CatalogButtons;
