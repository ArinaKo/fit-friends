import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  extractActionsTypes,
  makeFakeCatalogDataSlice,
  withStore,
} from '../../utils';
import CatalogButtons from './catalog-buttons.component';
import { CatalogData } from '../../types';
import { increaseCatalogPage } from '../../store';

describe('Component: CatalogButtons', () => {
  it('should render correct', () => {
    const expectedText1 = 'Показать еще';
    const expectedText2 = 'Вернуться в начало';
    const firstButtonTestId = 'showMoreButton';
    const secondButtonTestId = 'scrollToTopButton';
    const mockSlice: CatalogData = {
      ...makeFakeCatalogDataSlice(),
      currentPage: 1,
      totalPages: 2,
    };
    const { withStoreComponent } = withStore(<CatalogButtons styleClass="" />, {
      CATALOG_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.queryByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByTestId(firstButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(firstButtonTestId)).not.toHaveClass(
      'show-more__button--not-active',
    );
    expect(screen.getByTestId(secondButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(secondButtonTestId)).toHaveClass(
      'show-more__button--not-active',
    );
  });

  it('should show second button when all catalog items are shown', () => {
    const firstButtonTestId = 'showMoreButton';
    const secondButtonTestId = 'scrollToTopButton';
    const mockSlice: CatalogData = {
      ...makeFakeCatalogDataSlice(),
      currentPage: 2,
      totalPages: 2,
    };
    const { withStoreComponent } = withStore(<CatalogButtons styleClass="" />, {
      CATALOG_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(secondButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(secondButtonTestId)).not.toHaveClass(
      'show-more__button--not-active',
    );
    expect(screen.getByTestId(firstButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(firstButtonTestId)).toHaveClass(
      'show-more__button--not-active',
    );
  });

  it('should render no buttons when total pages number is 1', () => {
    const firstButtonTestId = 'showMoreButton';
    const secondButtonTestId = 'scrollToTopButton';
    const mockSlice: CatalogData = {
      ...makeFakeCatalogDataSlice(),
      currentPage: 1,
      totalPages: 1,
    };
    const { withStoreComponent } = withStore(<CatalogButtons styleClass="" />, {
      CATALOG_DATA: mockSlice,
    });

    render(withStoreComponent);

    expect(screen.getByTestId(secondButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(secondButtonTestId)).toHaveClass(
      'show-more__button--not-active',
    );
    expect(screen.getByTestId(firstButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(firstButtonTestId)).toHaveClass(
      'show-more__button--not-active',
    );
  });

  it('should dispatch "increaseCatalogPage" when user click show more button', async () => {
    const buttonTestId = 'showMoreButton';
    const mockSlice: CatalogData = {
      ...makeFakeCatalogDataSlice(),
      currentPage: 1,
      totalPages: 1,
    };
    const { withStoreComponent, mockStore } = withStore(
      <CatalogButtons styleClass="" />,
      {
        CATALOG_DATA: mockSlice,
      },
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(buttonTestId));
    const actionsTypes = extractActionsTypes(mockStore.getActions());

    expect(actionsTypes).toEqual([increaseCatalogPage.type]);
  });
});
