import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActivePopup } from '../../store';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';
import { PopupTypeDiffs } from './popup';
import { PopupKey } from '../../const';

type PopupProps = {
  type: PopupKey;
};

function Popup({ type }: PopupProps): JSX.Element {
  const { title, innerElement, isActiveSelector } = PopupTypeDiffs[type];
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(isActiveSelector);

  const handleKeydownEvent = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(setActivePopup());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (isActive) {
      window.scrollTo({ top: 0 });
      document.body.classList.add('with-popup');
      document.addEventListener('keydown', handleKeydownEvent);
      return;
    }
    document.body.classList.remove('with-popup');
    document.removeEventListener('keydown', handleKeydownEvent);
  }, [dispatch, handleKeydownEvent, isActive]);

  return (
    <FocusLock disabled={!isActive}>
      <div
        className={cn('popup-form', {
          'popup-form--active': isActive,
          'visually-hidden': !isActive,
        })}
      >
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">{title}</h2>
              <button
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
                onClick={() => {
                  dispatch(setActivePopup());
                }}
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            {innerElement ? innerElement() : undefined}
          </div>
        </section>
      </div>
    </FocusLock>
  );
}

export default Popup;
