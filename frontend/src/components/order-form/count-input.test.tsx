import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeOrderFormSlice,
  withStore,
} from '../../utils';
import CountInput from './count-input.component';
import userEvent from '@testing-library/user-event';
import { decreaseCount, increaseCount } from '../../store';
import { OrderForm } from '../../types';

describe('Component: CountInput', () => {
  const decreaseButtonTestId = 'decreaseButton';
  const increaseButtonTestId = 'increaseButton';
  const mockOrderFormSlice = makeFakeOrderFormSlice();

  it('should render correct', () => {
    const mockSlice: OrderForm = {
      ...mockOrderFormSlice,
      count: 1,
    };
    const { withStoreComponent } = withStore(<CountInput />, {
      ORDER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByDisplayValue(mockSlice.count)).toBeInTheDocument();
    expect(screen.getByTestId(decreaseButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(increaseButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(decreaseButtonTestId)).toBeDisabled();
  });

  it('should dispatch "decreaseCount" when user click decrease button', async () => {
    const mockSlice: OrderForm = {
      ...mockOrderFormSlice,
      count: 2,
    };
    const { withStoreComponent, mockStore } = withStore(<CountInput />, {
      ORDER_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(decreaseButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([decreaseCount.type]);
  });

  it('should dispatch "increaseCount" when user user click increase button', async () => {
    const mockSlice: OrderForm = {
      ...mockOrderFormSlice,
      count: 1,
    };
    const { withStoreComponent, mockStore } = withStore(<CountInput />, {
      ORDER_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(increaseButtonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([increaseCount.type]);
  });
});
