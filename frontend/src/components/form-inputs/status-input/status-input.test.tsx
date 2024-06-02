import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import StatusInput from './status-input.component';
import { UserForm } from '../../../types';
import { setStatus } from '../../../store';
import { StatusInputMode } from './status-input.mode';

describe('Component: StatusInput', () => {
  const inputTestId = 'statusCheckbox';
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct when checked', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      status: true,
    };
    const { withStoreComponent } = withStore(
      <StatusInput isActive mode={StatusInputMode.Account} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(inputTestId)).toBeChecked();
  });

  it('should render correct when not checked', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      status: false,
    };
    const { withStoreComponent } = withStore(
      <StatusInput isActive mode={StatusInputMode.Account} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByTestId(inputTestId)).not.toBeChecked();
  });

  it('should dispatch "setStatus" when input is changed', () => {
    const { withStoreComponent, mockStore } = withStore(
      <StatusInput isActive mode={StatusInputMode.Account} />,
      {
        USER_FORM: mockUserFormSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.click(screen.getAllByTestId(inputTestId)[0]);
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setStatus.type]);
  });
});
