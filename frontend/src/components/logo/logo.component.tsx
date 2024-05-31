import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCurrentPage, isUserCoach } from '../../store';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  const activePage = useAppSelector(getCurrentPage);
  const isCoach = useAppSelector(isUserCoach);
  const link = isCoach ? AppRoute.Account : AppRoute.Main;
  return (
    <Link
      to={activePage === link ? '#' : link}
      className="header__logo"
      aria-label="Переход на главную"
      data-testid="Logo"
    >
      <svg width={187} height={70} aria-hidden="true">
        <use xlinkHref="#logo" />
      </svg>
    </Link>
  );
}

export default Logo;
