import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import DateOfBirthInput from './day-of-birth-input.component';
import { UserForm } from '../../../types';
import { setDateOfBirth, setUserFormError } from '../../../store';
import userEvent from '@testing-library/user-event';

describe('Component: DateOfBirthInput', () => {
  const inputTestId = 'dateInput';
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      dateOfBirth: '06-01-2000',
    };
    const { withStoreComponent } = withStore(<DateOfBirthInput />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText('Дата рождения')).toBeInTheDocument();
    expect(screen.getByTestId(inputTestId)).toHaveValue('2000-06-01');
  });

  it('should dispatch "setDateOfBirth" when value is changed', async () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      dateOfBirth: '',
    };
    const { withStoreComponent, mockStore } = withStore(<DateOfBirthInput />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), '2000-06-01');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setDateOfBirth.type]);
  });

  it('should dispatch "setDateOfBirth" and "setUserFormError" when value is changed and invalid', async () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      dateOfBirth: '',
    };
    const { withStoreComponent, mockStore } = withStore(<DateOfBirthInput />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(inputTestId), '2030-06-01');
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setDateOfBirth.type, setUserFormError.type]);
  });

  it('should display error message when it exists', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      validationErrors: {
        ...mockUserFormSlice.validationErrors,
        dateOfBirth: 'error',
      },
    };
    const { withStoreComponent } = withStore(<DateOfBirthInput />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
