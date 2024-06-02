import { fireEvent, render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeUserFormSlice,
  withStore,
} from '../../../utils';
import RadioInput from './radio-input.component';
import { UserForm } from '../../../types';
import { setLevel } from '../../../store';
import { RadioInputType } from './radio-input';
import { UserLevel } from '../../../const';

describe('Component: RadioInput', () => {
  const mockUserFormSlice = makeFakeUserFormSlice();

  it('should render correct', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      level: UserLevel.Beginner,
    };
    const { withStoreComponent } = withStore(
      <RadioInput type={RadioInputType.Level} styleClass="" />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);

    expect(screen.getByLabelText('Новичок')).toBeChecked();
    expect(screen.getByLabelText('Любитель')).not.toBeChecked();
    expect(screen.getByLabelText('Профессионал')).not.toBeChecked();
  });

  it('should dispatch "setLevel" when input change', () => {
    const mockSlice: UserForm = {
      ...mockUserFormSlice,
      level: UserLevel.Amateur,
    };
    const { withStoreComponent, mockStore } = withStore(
      <RadioInput type={RadioInputType.Level} styleClass="" />,
      {
        USER_FORM: mockSlice,
      },
    );

    render(withStoreComponent);
    fireEvent.click(screen.getByLabelText('Профессионал'));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setLevel.type]);
  });
});
