import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeAppDataSlice,
  withStore,
} from '../../utils';
import Popup from './popup.component';
import { AppData } from '../../types';
import { PopupKey } from '../../const';
import userEvent from '@testing-library/user-event';
import { setActivePopup } from '../../store';

vi.mock('react-focus-lock', () => ({
  default: ({ children }: { children: JSX.Element }) => (
    <div data-testid="react-focus-lock">{children}</div>
  ),
}));

describe('Component: Popup', () => {
  const popupTestId = 'popup';
  const focusLockTestId = 'react-focus-lock';
  const closeButtonTestId = 'closeButton';
  const activeClass = 'popup-form--active';
  const inactiveClass = 'visually-hidden';
  window.scrollTo = vi.fn(() => '');

  it('should render correct', () => {
    const expectedText = 'Inner component';
    const mockInnerComponent = <div>{expectedText}</div>;
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      activePopup: PopupKey.Comment,
    };
    const { withStoreComponent } = withStore(
      <Popup type={PopupKey.Comment} title="">
        {mockInnerComponent}
      </Popup>,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(popupTestId)).toHaveClass(activeClass);
    expect(screen.getByTestId(popupTestId)).not.toHaveClass(inactiveClass);
    expect(screen.getByTestId(focusLockTestId)).toBeInTheDocument();
    expect(screen.getByTestId(closeButtonTestId)).toBeInTheDocument();
  });

  it('should dispatch "setActivePopup" when user click close button', async () => {
    const expectedText = 'Inner component';
    const mockInnerComponent = <div>{expectedText}</div>;
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      activePopup: PopupKey.Comment,
    };
    const { withStoreComponent, mockStore } = withStore(
      <Popup type={PopupKey.Comment} title="">
        {mockInnerComponent}
      </Popup>,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(closeButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setActivePopup.type]);
  });

  it('should dispatch "setActivePopup" when user click escape button', async () => {
    const expectedText = 'Inner component';
    const mockInnerComponent = <div>{expectedText}</div>;
    const mockSlice: AppData = {
      ...makeFakeAppDataSlice(),
      activePopup: PopupKey.Comment,
    };
    const { withStoreComponent, mockStore } = withStore(
      <Popup type={PopupKey.Comment} title="">
        {mockInnerComponent}
      </Popup>,
      {
        APP_DATA: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.keyboard('{Escape}');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setActivePopup.type]);
  });
});
