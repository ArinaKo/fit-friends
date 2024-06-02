import { render, screen } from '@testing-library/react';
import {
  extractActionsTypes,
  makeFakeOrderFormSlice,
  withStore,
} from '../../utils';
import PaymentTypeInput from './payment-type-input.component';
import userEvent from '@testing-library/user-event';
import { setPaymentType } from '../../store';

describe('Component: PaymentTypeInput', () => {
  const inputTestId = 'paymentType';
  const mockSlice = makeFakeOrderFormSlice();

  it('should render correct', () => {
    const { withStoreComponent } = withStore(<PaymentTypeInput />, {
      ORDER_FORM: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getAllByTestId(inputTestId)).toHaveLength(3);
  });

  it('should dispatch "setPaymentType" when user change input value', async () => {
    const { withStoreComponent, mockStore } = withStore(<PaymentTypeInput />, {
      ORDER_FORM: mockSlice,
    });

    render(withStoreComponent);
    await userEvent.click(screen.getAllByTestId(inputTestId)[2]);
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([setPaymentType.type]);
  });
});
