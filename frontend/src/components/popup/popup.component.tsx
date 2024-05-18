import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePopup, setActivePopup } from '../../store';
import { PopupKey } from '../../const';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';

type PopupProps = {
  type: PopupKey;
  title: string;
  children: JSX.Element;
};

function Popup({ type, title, children }: PopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activePopup = useAppSelector(getActivePopup);
  const isActive = activePopup === type;

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
            {children}
          </div>
        </section>
      </div>
    </FocusLock>
  );
}

export default Popup;
