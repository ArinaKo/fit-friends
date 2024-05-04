import cn from 'classnames';

export interface CatalogButtonsProps {
  styleClass: string;
  onShowMoreButtonClick: (evt: React.MouseEvent) => void;
}

function CatalogButtons({
  styleClass,
  onShowMoreButtonClick,
}: CatalogButtonsProps) {
  return (
    <div className={cn('show-more', styleClass)}>
      <button
        className="btn show-more__button show-more__button--more"
        type="button"
        onClick={onShowMoreButtonClick}
      >
        Показать еще
      </button>
      <button
        className="btn show-more__button show-more__button--to-top"
        type="button"
      >
        Вернуться в начало
      </button>
    </div>
  );
}

export default CatalogButtons;
