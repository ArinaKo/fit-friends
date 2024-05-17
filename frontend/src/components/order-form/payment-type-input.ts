import { PaymentType } from '../../const';

type PaymentTypeItem = {
  [key: string]: {
    label: string;
    icon: string;
    iconWidth: number;
    iconHeight: number;
  };
};

export const PaymentTypeItem: PaymentTypeItem = {
  [PaymentType.Visa]: {
    label: 'Visa',
    icon: '#visa-logo',
    iconWidth: 58,
    iconHeight: 20,
  },
  [PaymentType.Mir]: {
    label: 'Мир',
    icon: '#mir-logo',
    iconWidth: 66,
    iconHeight: 20,
  },
  [PaymentType.Umoney]: {
    label: 'Iomoney',
    icon: '#iomoney-logo',
    iconWidth: 106,
    iconHeight: 24,
  },
};
