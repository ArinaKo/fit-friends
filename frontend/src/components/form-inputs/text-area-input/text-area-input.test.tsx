import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import TextAreaInput from './text-area-input.component';
import { UserForm } from '../../../types';
import { setDescription, setUserFormError } from '../../../store';
import { TextAreaInputType } from './text-area-input';
import userEvent from '@testing-library/user-event';

describe('Component: TextAreaInput', () => {
  const inputTestId = 'textAreaInput';
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      description: 'Description',
    };
    const { withStoreComponent } = withStore(
      <TextAreaInput type={TextAreaInputType.UserDescription} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toHaveValue('Description');
  });

  it('should dispatch "setDescription" when user type valid value', async () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      description: 'Descriptio',
    };
    const { withStoreComponent, mockStore } = withStore(
      <TextAreaInput type={TextAreaInputType.UserDescription} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), 'n');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setDescription.type]);
  });

  it('should dispatch "setDescription" and "setUserFormError" when user type invalid value', async () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      description: '',
    };
    const { withStoreComponent, mockStore } = withStore(
      <TextAreaInput type={TextAreaInputType.UserDescription} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), '2');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setDescription.type, setUserFormError.type]);
  });

  it('should display error message when it exists', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      validationErrors: {
        ...mockUserFormSlice.validationErrors,
        description: 'error',
      },
    };
    const { withStoreComponent } = withStore(
      <TextAreaInput type={TextAreaInputType.UserDescription} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
