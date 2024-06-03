import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import AvatarInput from './avatar-input.component';
import { UserForm } from '../../../types';
import userEvent from '@testing-library/user-event';
import { setAvatar, setUserFormError } from '../../../store';

describe('Component: AvatarInput', () => {
  const inputTestId = 'fileInput';
  const changeButtonTestId = 'changeButton';
  const deleteButtonTestId = 'deleteButton';
  const mockUserFormSlice = makeFakeUserFormSlice();
  const mockFile = new File([], '');

  it('should render correct when empty', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      avatar: undefined,
    };
    const { withStoreComponent } = withStore(
      <AvatarInput setFile={vi.fn()} withControls isActive />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(changeButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(deleteButtonTestId)).toBeInTheDocument();
  });

  it('should render correct when not empty', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      avatar: 'image.jpg',
    };
    const { withStoreComponent } = withStore(
      <AvatarInput setFile={vi.fn()} withControls isActive />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(changeButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(deleteButtonTestId)).toBeInTheDocument();
  });

  it('should call "setFile" and dispatch "setAvatar" and "setUserFormError" when file uploaded', () => {
    global.URL.createObjectURL = vi.fn(() => 'image.jpg');
    const mockSetFile = vi.fn();
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      avatar: undefined,
    };
    const { withStoreComponent, mockStore } = withStore(
      <AvatarInput setFile={mockSetFile} withControls isActive />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.change(screen.getByTestId(inputTestId), {
      target: { files: [mockFile] },
    });
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setAvatar.type, setUserFormError.type]);
    expect(mockSetFile).toBeCalledTimes(1);
    expect(mockSetFile).toBeCalledWith(mockFile);
  });

  it('should call "setFile" and dispatch "setAvatar" when user click delete button', async () => {
    global.URL.createObjectURL = vi.fn(() => 'image.jpg');
    const mockSetFile = vi.fn();
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      avatar: 'image.jpg',
    };
    const { withStoreComponent, mockStore } = withStore(
      <AvatarInput setFile={mockSetFile} withControls isActive />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(deleteButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setAvatar.type]);
    expect(mockSetFile).toBeCalledTimes(1);
    expect(mockSetFile).toBeCalledWith(null);
  });
});
