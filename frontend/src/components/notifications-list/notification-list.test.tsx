import { render, screen } from '@testing-library/react';
import {
  makeFakeAppDataSlice,
  makeFakeNotification,
  withStore,
} from '../../utils';
import NotificationsList from './notifications-list.component';
import { AppData } from '../../types';

vi.mock('./notification-card.component', () => ({
  default: () => (
    <div data-testid="notificationCard">NotificationCard component</div>
  ),
}));

describe('Component: NotificationsList', () => {
  const notificationTestId = 'notificationCard';
  const containerTestId = 'notificationsContainer';

  it('should render correct', () => {
    const expectedText = 'Оповещения';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      notifications: [makeFakeNotification(), makeFakeNotification()],
    };
    const { withStoreComponent } = withStore(<NotificationsList />, {
      APP_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(containerTestId)).toHaveClass('is-notifications');
    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(notificationTestId)).toHaveLength(2);
  });

  it('should render correct when list is empty', () => {
    const expectedText = 'Оповещения';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      notifications: [],
    };
    const { withStoreComponent } = withStore(<NotificationsList />, {
      APP_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(containerTestId)).not.toHaveClass(
      'is-notifications',
    );
    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(notificationTestId)).toHaveLength(0);
  });
});
