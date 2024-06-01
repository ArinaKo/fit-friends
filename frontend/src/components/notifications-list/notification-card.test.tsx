import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeNotification,
  withStore,
} from '../../utils';
import NotificationCard from './notification-card.component';
import { Notification } from '../../types';
import userEvent from '@testing-library/user-event';
import { deleteNotificationAction } from '../../store';
import { APIRoute } from '../../const';

describe('Component: NotificationCard', () => {
  const mockNotification: Notification = {
    ...makeFakeNotification(),
    date: new Date('06-01-2024 10:21:15'),
  };
  const notificationTestId = 'notification';

  it('should render correct', () => {
    const expectedText = '1 июня, 10:21';
    const { text } = mockNotification;
    const { withStoreComponent } = withStore(
      <NotificationCard notification={mockNotification} />,
      {},
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId(notificationTestId)).toBeInTheDocument();
  });

  it('should dispatch "deleteNotificationAction.pending" and "deleteNotificationAction.fulfilled" when file uploaded', async () => {
    const { id } = mockNotification;
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <NotificationCard notification={mockNotification} />,
      {},
    );
    mockAxiosAdapter.onDelete(`${APIRoute.Notifications}/${id}`).reply(200);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(notificationTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      deleteNotificationAction.pending.type,
      deleteNotificationAction.fulfilled.type,
    ]);
  });
});
