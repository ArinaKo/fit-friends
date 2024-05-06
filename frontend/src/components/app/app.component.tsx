import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { EntryLayout, HistoryRouter, Layout, PrivateRoute } from '../index';
import { HelmetProvider } from 'react-helmet-async';
import browserHistory from '../../browser-history';
import {
  AccountPage,
  BalancePage,
  CoachWorkoutsPage,
  CreateWorkoutPage,
  FriendsPage,
  IntroPage,
  LoginPage,
  OrdersPage,
  QuestionaryPage,
  RegisterPage,
  WorkoutsCatalogPage,
} from '../../pages';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<IntroPage />} />
          <Route element={<EntryLayout />}>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Register} element={<RegisterPage />} />
            <Route
              path={AppRoute.Questionary}
              element={
                <PrivateRoute>
                  <QuestionaryPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route
              path={AppRoute.Main}
              element={<div>Not implemented - main page</div>}
            />
            <Route path={AppRoute.Account} element={<AccountPage />} />
            <Route path={AppRoute.Friends} element={<FriendsPage />} />
            <Route path={AppRoute.Balance} element={<BalancePage />} />
            <Route
              path={AppRoute.CoachWorkouts}
              element={<CoachWorkoutsPage />}
            />
            <Route path={AppRoute.Orders} element={<OrdersPage />} />
            <Route
              path={AppRoute.CreateWorkout}
              element={<CreateWorkoutPage />}
            />
            <Route path={AppRoute.Users} element={<div>Not implemented</div>} />
            <Route path={`${AppRoute.Users}:userId`} element={<div>Not implemented</div>} />
            <Route
              path={AppRoute.Workouts}
              element={<div>Not implemented - workouts list page</div>}
            />
            <Route path={AppRoute.Workouts} element={<WorkoutsCatalogPage />} />
            <Route
              path={`${AppRoute.Workouts}:workoutId`}
              element={<div>Not implemented - workout page</div>}
            />
          </Route>
          <Route path="*" element={<div>Not implemented - 404 page</div>} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
