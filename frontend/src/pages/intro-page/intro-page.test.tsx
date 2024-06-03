import { render, screen } from '@testing-library/react';
import IntroPage from './intro-page.component';
import { withHistory } from '../../utils';

describe('Component: IntroPage', () => {
  it('should render correct', () => {
    const preparedComponent = withHistory(<IntroPage />);

    render(preparedComponent);

    expect(screen.getByAltText('Фон с бегущей девушкой')).toBeInTheDocument();
    expect(screen.getByAltText('Логотип Fit Friends')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('Есть аккаунт?')).toBeInTheDocument();
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });
});
