import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { isAuthRequesting, isUserAuth } from '../../store';
import UIBlocker from '../ui-blocker/ui-blocker.component';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): React.JSX.Element {
  const isAuth = useAppSelector(isUserAuth);
  const isRequesting = useAppSelector(isAuthRequesting);
  if (isRequesting) {
    return <UIBlocker />;
  }
  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
