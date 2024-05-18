import { DivIcon, divIcon } from 'leaflet';

export enum MarkerType {
  User = 'user',
}

type MarkerIcon = {
  [key in MarkerType]: DivIcon;
};

export const MarkerIcon: MarkerIcon = {
  [MarkerType.User]: divIcon({
    html: `
    <svg
      class="popup__pin-icon"
      width="40"
      height="49"
      aria-hidden="true"
    >
      <use xlink:href="#icon-pin-user" />
    </svg>`,
    iconAnchor: [20, 49],
    iconSize: [40, 49],
    className: 'popup__pin popup__pin--user',
  }),
};
