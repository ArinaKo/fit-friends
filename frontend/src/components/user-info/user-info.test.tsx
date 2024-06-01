import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeAppDataSlice,
  makeFakeUserInfoSlice,
  withStore,
} from '../../utils';
import UserInfo from './user-info.component';
import { AppData, UserInfo as SliceType } from '../../types';
import { APIRoute, UserRole } from '../../const';
import userEvent from '@testing-library/user-event';
import {
  addUserToFriendsAction,
  removeUserFromFriendsAction,
  setActivePopup,
} from '../../store';

vi.mock('../index', () => ({
  default: vi.fn(),
  Popup: ({ children }: { children: JSX.Element }) => <div>{children}</div>,
  CoachCertificates: () => (
    <div data-testid="coachCertificates">CoachCertificates component</div>
  ),
  LocationMap: () => <div data-testid="locationMap">LocationMap component</div>,
  MarkerType: vi.fn(),
}));

describe('Component: UserInfo', () => {
  const mockAppDataSlice = makeFakeAppDataSlice();
  const mockUserInfoSlice = makeFakeUserInfoSlice();
  const certificatesTestId = 'coachCertificates';
  const mapTestId = 'locationMap';
  const mapButtonTestId = 'mapButton';
  const friendButtonTestId = 'friendButton';
  const certificatesButtonTestId = 'certificatesButton';

  it('should render correct', () => {
    const expectedText = 'Добавить в друзья';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      role: UserRole.Default,
      isReady: true,
    };
    const { name, location, description, workoutTypes, level, images } =
      userInfoSlice;
    const { withStoreComponent } = withStore(<UserInfo />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(location)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(`#${workoutTypes[0]}`)).toBeInTheDocument();
    expect(screen.getByText(`#${level}`)).toBeInTheDocument();
    expect(screen.getByAltText(images[0].originalName)).toBeInTheDocument();
    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
    expect(screen.getByTestId(mapButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(friendButtonTestId)).toBeInTheDocument();
  });

  it('should render correct when displayed user is coach', () => {
    const expectedText1 = 'Тренер';
    const expectedText2 = 'Готов тренировать';
    const expectedText3 = 'Посмотреть сертификаты';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      role: UserRole.Coach,
      isReady: true,
    };
    const { withStoreComponent } = withStore(<UserInfo />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();
    expect(screen.getByTestId(certificatesButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(certificatesTestId)).toBeInTheDocument();
  });

  it('should render correct when displayed user is customer', () => {
    const expectedText = 'Готов к тренировке';
    const notExpectedText1 = 'Тренер';
    const notExpectedText2 = 'Посмотреть сертификаты';
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      role: UserRole.Default,
      isReady: true,
    };
    const { withStoreComponent } = withStore(<UserInfo />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText1)).not.toBeInTheDocument();
    expect(screen.queryByText(notExpectedText2)).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(certificatesButtonTestId),
    ).not.toBeInTheDocument();
  });

  it('should dispatch "setActivePopup" when user click map button', async () => {
    const { withStoreComponent, mockStore } = withStore(<UserInfo />, {
      APP_DATA: mockAppDataSlice,
      USER_INFO: mockUserInfoSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(mapButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setActivePopup.type]);
  });

  it('should dispatch "setActivePopup" when user click map button', async () => {
    const { withStoreComponent, mockStore } = withStore(<UserInfo />, {
      APP_DATA: mockAppDataSlice,
      USER_INFO: mockUserInfoSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(mapButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setActivePopup.type]);
  });

  it('should dispatch "certificatesButtonTestId" when user click map button', async () => {
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      role: UserRole.Coach,
    };
    const { withStoreComponent, mockStore } = withStore(<UserInfo />, {
      APP_DATA: mockAppDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(certificatesButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setActivePopup.type]);
  });

  it('should dispatch "addUserToFriendsAction.pending" and "addUserToFriendsAction.fulfilled" when customer user click friend-button and displayed user is not a friend', async () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Default,
    };
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      isFriend: false,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <UserInfo />,
      {
        APP_DATA: appDataSlice,
        USER_INFO: userInfoSlice,
      },
    );
    mockAxiosAdapter.onPatch(APIRoute.AddFriend).reply(204);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(friendButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      addUserToFriendsAction.pending.type,
      addUserToFriendsAction.fulfilled.type,
    ]);
  });

  it('should render disabled friend-button when user is coach and displayed user is not a friend', () => {
    const appDataSlice: AppData = {
      ...mockAppDataSlice,
      userRole: UserRole.Coach,
    };
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      isFriend: false,
    };
    const { withStoreComponent } = withStore(<UserInfo />, {
      APP_DATA: appDataSlice,
      USER_INFO: userInfoSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(friendButtonTestId)).toBeDisabled();
  });

  it('should dispatch "removeUserFromFriendsAction.pending" and "removeUserFromFriendsAction.fulfilled" when user click friend-button and displayed user is a friend', async () => {
    const userInfoSlice: SliceType = {
      ...mockUserInfoSlice,
      isFriend: true,
    };
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <UserInfo />,
      {
        APP_DATA: mockAppDataSlice,
        USER_INFO: userInfoSlice,
      },
    );
    mockAxiosAdapter.onPatch(APIRoute.RemoveFriend).reply(204);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(friendButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([
      removeUserFromFriendsAction.pending.type,
      removeUserFromFriendsAction.fulfilled.type,
    ]);
  });
});
