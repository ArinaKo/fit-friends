import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import SelectInput from './select-input.component';
import { UserForm } from '../../../types';
import { setLevel, setUserFormError } from '../../../store';
import { SelectInputType } from './select-input';
import { UserLevel } from '../../../const';

describe('Component: SelectInput', () => {
  const selectTestId = 'selectValue';
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      level: UserLevel.Beginner,
    };
    const { withStoreComponent } = withStore(
      <SelectInput type={SelectInputType.Level} isActive />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getAllByText('Новичок')).toHaveLength(2);
  });

  it('should dispatch "setLevel" and "setUserFormError" when input change', () => {
    const { withStoreComponent, mockStore } = withStore(
      <SelectInput type={SelectInputType.Level} isActive />,
      {
        USER_FORM: mockUserFormSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.click(screen.getAllByTestId(selectTestId)[1]);
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setLevel.type, setUserFormError.type]);
  });

  it('should display error message when it exists', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      validationErrors: {
        ...mockUserFormSlice.validationErrors,
        level: 'error',
      },
    };
    const { withStoreComponent } = withStore(
      <SelectInput type={SelectInputType.Level} isActive />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
