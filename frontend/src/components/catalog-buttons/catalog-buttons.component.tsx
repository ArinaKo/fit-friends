import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  increaseCatalogPage,
  isAllCatalogItems,
  isCatalogDataLoading,
  isCatalogScrollActive,
} from '../../store';

export interface CatalogButtonsProps {
  styleClass: string;
}

function CatalogButtons({ styleClass }: CatalogButtonsProps) {
  const dispatch = useAppDispatch();
  const isAll = useAppSelector(isAllCatalogItems);
  const isScrollActive = useAppSelector(isCatalogScrollActive);
  const isDisabled = useAppSelector(isCatalogDataLoading);

  return (
    <div className={cn('show-more', styleClass)}>
      <button
        className={cn('btn show-more__button show-more__button--more', {
          'show-more__button--not-active': isAll,
        })}
        type="button"
        disabled={isDisabled}
        onClick={() => dispatch(increaseCatalogPage())}
      >
        Показать еще
      </button>
      <button
        className={cn('btn show-more__button show-more__button--to-top', {
          'show-more__button--not-active': !isAll || !isScrollActive,
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
