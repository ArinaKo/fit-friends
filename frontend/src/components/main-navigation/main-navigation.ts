import { AppRoute } from '../../const';
import { Route } from '../../types';

type MainLink = {
  Icon: string;
  Route: Route;
  Label: string;
  IconSize: {
    Width: number;
    Height: number;
  };
};

type MainLinks = { [key: string]: MainLink };

const MainLinks: MainLinks = {
  MainPageUser: {
    Icon: '#icon-home',
    Route: AppRoute.Main,
    Label: 'На главную',
    IconSize: {
      Width: 18,
      Height: 18,
    },
  },
  MainPageCoach: {
    Icon: '#icon-home',
    Route: AppRoute.Account,
    Label: 'На главную',
    IconSize: {
      Width: 18,
      Height: 18,
    },
  },
  AccountPage: {
    Icon: '#icon-user',
    Route: AppRoute.Account,
    Label: 'Создать тренировку',
    IconSize: {
      Width: 16,
      Height: 18,
    },
  },
  FriendsPage: {
    Icon: '#icon-friends',
    Route: AppRoute.Friends,
    Label: 'Друзья',
    IconSize: {
      Width: 22,
      Height: 16,
    },
  },
};

export const CoachLinks = [MainLinks.MainPageCoach, MainLinks.AccountPage, MainLinks.FriendsPage];
export const UserLinks = [MainLinks.MainPageUser, MainLinks.AccountPage, MainLinks.FriendsPage];
