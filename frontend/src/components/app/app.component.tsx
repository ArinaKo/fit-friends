import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { EntryLayout, Layout, PrivateRoute } from '../index';
import {
  AccountPage,
  BalancePage,
  CoachWorkoutsPage,
  CreateWorkoutPage,
  FriendsPage,
  IntroPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  OrdersPage,
  QuestionaryPage,
  RegisterPage,
  UserPage,
  UsersCatalogPage,
  WorkoutPage,
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
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Account} element={<AccountPage />} />
        <Route path={AppRoute.Friends} element={<FriendsPage />} />
        <Route path={AppRoute.Balance} element={<BalancePage />} />
        <Route path={AppRoute.CoachWorkouts} element={<CoachWorkoutsPage />} />
        <Route path={AppRoute.Orders} element={<OrdersPage />} />
        <Route path={AppRoute.CreateWorkout} element={<CreateWorkoutPage />} />
        <Route path={AppRoute.Users} element={<UsersCatalogPage />} />
        <Route path={`${AppRoute.Users}/:userId`} element={<UserPage />} />
        <Route path={AppRoute.Workouts} element={<WorkoutsCatalogPage />} />
        <Route
          path={`${AppRoute.Workouts}/:workoutId`}
          element={<WorkoutPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
