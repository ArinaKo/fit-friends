import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import CustomInput from './custom-input.component';
import { UserForm } from '../../../types';
import { setName, setUserFormError } from '../../../store';
import { CustomInputType } from './custom-input';
import userEvent from '@testing-library/user-event';

describe('Component: CustomInput', () => {
  const inputTestId = 'customInput';
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      name: 'John',
    };
    const { withStoreComponent } = withStore(
      <CustomInput type={CustomInputType.Name} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toHaveValue('John');
  });

  it('should dispatch "setName" when user type valid value', async () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      name: 'Joh',
    };
    const { withStoreComponent, mockStore } = withStore(
      <CustomInput type={CustomInputType.Name} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), 'n');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setName.type]);
  });

  it('should dispatch "setName" and "setUserFormError" when user type invalid value', async () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      name: 'John',
    };
    const { withStoreComponent, mockStore } = withStore(
      <CustomInput type={CustomInputType.Name} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), '1');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setName.type, setUserFormError.type]);
  });

  it('should display error message when it exists', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      validationErrors: {
        ...mockUserFormSlice.validationErrors,
        name: 'error',
      },
    };
    const { withStoreComponent } = withStore(
      <CustomInput type={CustomInputType.Name} />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
