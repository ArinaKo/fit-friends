import { Location } from '../types';

export enum MetroStation {
  Avtovo = 'Автово',
  Akademicheskaya = 'Академическая',
  Baltiyskaya = 'Балтийская',
  Vladimirskaya = 'Владимирская',
  Vyborgskaya = 'Выборгская',
  Devyatkino = 'Девяткино',
  Lesnaya = 'Лесная',
  Narvskaya = 'Нарвская',
  Petrogadskaya = 'Петроградская',
  Pionerskaya = 'Пионерская',
  Pushkinskaya = 'Пушкинская',
  Sportivnaya = 'Спортивная',
  Udelnaya = 'Удельная',
  Chernyshevskaya = 'Чернышевская',
  Zvyozdnaya = 'Звёздная',
}

type MetroLocation = {
  [name in MetroStation]: Location;
};

export const MetroLocation: MetroLocation = {
  [MetroStation.Avtovo]: {
    latitude: 59.86653191106516,
    longitude: 30.260974218438783,
  },
  [MetroStation.Akademicheskaya]: {
    latitude: 60.012943457212714,
    longitude: 30.39588468966783,
  },
  [MetroStation.Baltiyskaya]: {
    latitude: 59.90795512263083,
    longitude: 30.302979968620626,
  },
  [MetroStation.Vladimirskaya]: {
    latitude: 59.92627036022967,
    longitude: 30.347215021573895,
  },
  [MetroStation.Vyborgskaya]: {
    latitude: 59.97109811682033,
    longitude: 30.347327724520298,
  },
  [MetroStation.Devyatkino]: {
    latitude: 60.05049242053659,
    longitude: 30.442536183261687,
  },
  [MetroStation.Lesnaya]: {
    latitude: 59.98490718822296,
    longitude: 30.34417559753001,
  },
  [MetroStation.Narvskaya]: {
    latitude: 59.900185704877565,
    longitude: 30.27428836506015,
  },
  [MetroStation.Petrogadskaya]: {
    latitude: 59.966422177556346,
    longitude: 30.31126748292901,
  },
  [MetroStation.Pionerskaya]: {
    latitude: 60.00437727171317,
    longitude: 30.29614854464556,
  },
  [MetroStation.Pushkinskaya]: {
    latitude: 59.921307870090274,
    longitude: 30.332394195399765,
  },
  [MetroStation.Sportivnaya]: {
    latitude: 59.948332787863144,
    longitude: 30.28381254926065,
  },
  [MetroStation.Udelnaya]: {
    latitude: 60.0180783488178,
    longitude: 30.318212639724226,
  },
  [MetroStation.Chernyshevskaya]: {
    latitude: 59.944654485852354,
    longitude: 30.35990239478222,
  },
  [MetroStation.Zvyozdnaya]: {
    latitude: 59.833000780098885,
    longitude: 30.351706821603226,
  },
} as const;
