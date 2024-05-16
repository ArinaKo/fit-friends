export enum ButtonsIconType {
  Default = 'default',
  Small = 'small',
}

type IconTypeDiffs = {
  [type: string]: {
    height: number;
    width: number;
  };
};

export const IconTypeDiffs: IconTypeDiffs = {
  [ButtonsIconType.Default]: {
    height: 14,
    width: 16,
  },
  [ButtonsIconType.Small]: {
    height: 10,
    width: 14,
  },
};
