export enum SlidesAmount {
  AccountCertificates = 3,
  CoachWorkouts = 4,
  SpecialForYou = 3,
}

export const SliderConfig = {
  arrows: false,
  dots: false,
  infinite: false,
  centerMode: false,
  speed: 500,
  slidesToScroll: 1,
  variableWidth: true,
  adaptiveHeight: true,
} as const;
