import { SlidesAmount } from '../../const';

export enum SliderControlsType {
  AccountCertificates = 'account-certificates',
  CoachWorkouts = 'coach-workouts',
}

type SliderControlsTypeDiff = {
  slidesToShow: number;
  styleClass: string;
  iconSize: {
    height: number;
    width: number;
  };
};

type SliderControlsTypeDiffs = {
  [type: string]: SliderControlsTypeDiff;
};

export const SliderControlsTypeDiffs: SliderControlsTypeDiffs = {
  [SliderControlsType.AccountCertificates]: {
    slidesToShow: SlidesAmount.AccountCertificates,
    styleClass: 'personal-account-coach__control',
    iconSize: {
      height: 14,
      width: 16,
    },
  },
  [SliderControlsType.CoachWorkouts]: {
    slidesToShow: SlidesAmount.CoachWorkouts,
    styleClass: 'user-card__training-btn',
    iconSize: {
      height: 10,
      width: 14,
    },
  },
};
