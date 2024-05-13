import { AppRoute } from '../../const';
import { Route } from '../../types';

type AccountLink = {
  Icon: string;
  Route: Route;
  Label: string;
};

type AccountLinks = { [key: string]: AccountLink };

const AccountLinks: AccountLinks = {
  Workouts: {
    Icon: '#icon-flash',
    Route: AppRoute.CoachWorkouts,
    Label: 'Мои тренировки',
  },
  CreateWorkout: {
    Icon: '#icon-add',
    Route: AppRoute.CreateWorkout,
    Label: 'Создать тренировку',
  },
  Friends: {
    Icon: '#icon-friends',
    Route: AppRoute.Friends,
    Label: 'Мои друзья',
  },
  Orders: {
    Icon: '#icon-bag',
    Route: AppRoute.Orders,
    Label: 'Мои заказы',
  },
  Balance: {
    Icon: '#icon-shopping-cart',
    Route: AppRoute.Balance,
    Label: 'Мои покупки',
  },
};

export const CoachLinks = [AccountLinks.Workouts, AccountLinks.CreateWorkout, AccountLinks.Friends, AccountLinks.Orders];
export const CustomerLinks = [AccountLinks.Friends, AccountLinks.Balance];
