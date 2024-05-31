import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeAppDataSlice,
  withStore,
} from '../../utils';
import Request from './request.component';
import { AppData } from '../../types';
import { APIRoute, RequestStatus, UserRole } from '../../const';
import { updateWorkoutRequestAction } from '../../store';
import userEvent from '@testing-library/user-event';

describe('Component: Request', () => {
  const acceptButtonTestId = 'acceptButton';
  const rejectButtonTestId = 'rejectButton';

  it('should render correct', () => {
    const expectedText1 = 'Запрос на совместную тренировку';
    const expectedText2 = 'Принять';
    const expectedText3 = 'Отклонить';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(
      <Request request={{ id: '', status: RequestStatus.Default }} />,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByTestId(acceptButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(rejectButtonTestId)).toBeInTheDocument();
  });

  it('should render without buttons when request status is not default', () => {
    const expectedText1 = 'Запрос на совместную тренировку принят';
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent } = withStore(
      <Request request={{ id: '', status: RequestStatus.Accepted }} />,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.queryByTestId(acceptButtonTestId)).not.toBeInTheDocument();
    expect(screen.queryByTestId(rejectButtonTestId)).not.toBeInTheDocument();
  });

  it('should dispatch "updateWorkoutRequestAction.pending" and "updateWorkoutRequestAction.fulfilled" when user click button', async () => {
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      userRole: UserRole.Default,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <Request request={{ id: '', status: RequestStatus.Default }} />,
      {
        APP_DATA: mockSlice,
      },
    );
    mockAxiosAdapter.onPatch(APIRoute.UpdateWorkoutRequest).reply(200);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(acceptButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      updateWorkoutRequestAction.pending.type,
      updateWorkoutRequestAction.fulfilled.type,
    ]);
  });
});
