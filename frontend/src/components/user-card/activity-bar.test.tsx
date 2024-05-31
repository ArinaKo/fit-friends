import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeAppDataSlice,
  withStore,
} from '../../utils';
import ActivityBar from './activity-bar.component';
import { AppData } from '../../types';
import { APIRoute, UserRole } from '../../const';
import { createWorkoutRequestAction } from '../../store';
import userEvent from '@testing-library/user-event';

describe('Component: ActivityBar', () => {
  it('should render correct', () => {
    const expectedText1 = 'Готов к тренировке';
    const expectedText2 = 'Пригласить друга на совместную тренировку';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(
      <ActivityBar userId="" userRole={UserRole.Default} isReady />,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should be rendered without button because prop isReady value is "false"', () => {
    const expectedText = 'Не готов к тренировке';
    const notExpectedText = 'Готов к тренировке';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(
      <ActivityBar userId="" userRole={UserRole.Default} isReady={false} />,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should be rendered without button because user role is coach', () => {
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Coach,
    };
    const { withStoreComponent } = withStore(
      <ActivityBar userId="" userRole={UserRole.Default} isReady />,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should dispatch "createWorkoutRequestAction.pending" and "createWorkoutRequestAction.fulfilled" when user click button', async () => {
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <ActivityBar userId="" userRole={UserRole.Default} isReady />,
      {
        APP_DATA: mockSlice,
      },
    );
    mockAxiosAdapter.onPost(APIRoute.CreateWorkoutRequest).reply(201);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      createWorkoutRequestAction.pending.type,
      createWorkoutRequestAction.fulfilled.type,
    ]);
  });
});
