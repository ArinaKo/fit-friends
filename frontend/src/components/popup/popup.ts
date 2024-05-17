import { PopupKey } from '../../const';
import { isOrderPopupActive, isCommentPopupActive, isCertificatesPopupActive } from '../../store';
import { State } from '../../types';
import { CoachCertificates, CommentForm, OrderForm } from '../index';

type PopupTypeDiff = {
  title: string;
  innerElement: () => JSX.Element;
  isActiveSelector: (state: State) => boolean;
};

type PopupTypeDiffs = {
  [key: string]: PopupTypeDiff;
};

export const PopupTypeDiffs: PopupTypeDiffs = {
  [PopupKey.Comment]: {
    title: 'Оставить отзыв',
    innerElement: CommentForm,
    isActiveSelector: isCommentPopupActive,
  },
  [PopupKey.Order]: {
    title: 'Купить тренировку',
    innerElement: OrderForm,
    isActiveSelector: isOrderPopupActive,
  },
  [PopupKey.Certificates]: {
    title: 'Сертификаты',
    innerElement: CoachCertificates,
    isActiveSelector: isCertificatesPopupActive,
  },
};
