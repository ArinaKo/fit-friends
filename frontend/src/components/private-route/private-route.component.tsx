import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { isUserAuth } from '../../store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): React.JSX.Element {
  const isAuth = useAppSelector(isUserAuth);
  return isAuth ? children : <Navigate to={AppRoute.Root} />;
}

export default PrivateRoute;
