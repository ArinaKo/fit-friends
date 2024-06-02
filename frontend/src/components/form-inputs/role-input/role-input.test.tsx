import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import RoleInput from './role-input.component';
import { UserForm } from '../../../types';
import { setRole } from '../../../store';
import { UserRole } from '../../../const';

describe('Component: RoleInput', () => {
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      role: UserRole.Default,
    };
    const { withStoreComponent } = withStore(<RoleInput />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByLabelText('Я хочу тренироваться')).toBeChecked();
    expect(screen.getByLabelText('Я хочу тренировать')).not.toBeChecked();
  });

  it('should dispatch "setRole" when input change', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      role: UserRole.Default,
    };
    const { withStoreComponent, mockStore } = withStore(<RoleInput />, {
      USER_FORM: mockSlice,
    });

    render(withStoreComponent);
    fireEvent.click(screen.getByLabelText('Я хочу тренировать'));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setRole.type]);
  });
});
