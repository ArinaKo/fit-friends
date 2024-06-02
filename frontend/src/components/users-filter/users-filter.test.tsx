import { render, screen } from '@testing-library/react';
import { makeFakeUsersListSlice, withStore } from '../../utils';
import UsersFilter from './users-filter.component';
import { MetroStation, UserLevel, UserRole, WorkoutType } from '../../const';
import { UsersList } from '../../types';

describe('Component: UsersFilter', () => {
  const mockUsersListSlice = makeFakeUsersListSlice();

  it('should render correct', () => {
    const mockSlice: UsersList = {
      ...mockUsersListSlice,
    };
    const { withStoreComponent } = withStore(<UsersFilter />, {
      USERS_LIST: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText('Локация, станция метро')).toBeInTheDocument();
    expect(screen.getByText('Специализация')).toBeInTheDocument();
    expect(screen.getByText('Ваш уровень')).toBeInTheDocument();
    expect(screen.getByText('Сортировка')).toBeInTheDocument();
  });

  it('should display correct values', () => {
    const mockSlice: UsersList = {
      ...mockUsersListSlice,
      filter: {
        locations: [MetroStation.Petrogadskaya],
        types: [WorkoutType.Running],
        level: UserLevel.Beginner,
        role: UserRole.Coach,
      },
    };
    const { withStoreComponent } = withStore(<UsersFilter />, {
      USERS_LIST: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByLabelText('Петроградская')).toBeChecked();
    expect(screen.getByLabelText('Бег')).toBeChecked();
    expect(screen.getByLabelText('Новичок')).toBeChecked();
    expect(screen.getByLabelText('Тренеры')).toBeChecked();
  });
});
