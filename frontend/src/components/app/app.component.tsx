import { Routes, Route } from 'react-router-dom';
import { AccountPath, AppRoute, UsersPath, WorkoutsPath } from '../../const';
import { EntryLayout, HistoryRouter, Layout, PrivateRoute } from '../index';
import { HelmetProvider } from 'react-helmet-async';
import browserHistory from '../../browser-history';
import { IntroPage, LoginPage, RegisterPage } from '../../pages';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<IntroPage />}
          />
          <Route element={<EntryLayout />}>
            <Route
              path={AppRoute.Login}
              element={<LoginPage />}
            />
            <Route
              path={AppRoute.Register}
              element={<RegisterPage />}
            />
            <Route
              path={AppRoute.Questionary}
              element={
                <PrivateRoute>
                  <div>Not implemented - questionary page</div>
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
            <Route path={AppRoute.Account}>
              <Route
                index
                element={<div>Not implemented - account page</div>}
              />
              <Route
                path={AccountPath.Friends}
                element={<div>Not implemented - friends page</div>}
              />
              <Route
                path={AccountPath.Customer.Balance}
                element={<div>Not implemented - customer balance page</div>}
              />
              <Route
                path={AccountPath.Coach.Workouts}
                element={<div>Not implemented - coach workouts page</div>}
              />
              <Route
                path={AccountPath.Coach.Orders}
                element={<div>Not implemented - coach orders page</div>}
              />
              <Route
                path={AccountPath.Coach.CreateWorkout}
                element={<div>Not implemented - create workout page</div>}
              />
            </Route>
            <Route path={AppRoute.Users}>
              <Route index element={<div>Not implemented</div>} />
              <Route
                path={UsersPath.User}
                element={<div>Not implemented</div>}
              />
            </Route>

            <Route path={AppRoute.Workouts}>
              <Route
                index
                element={<div>Not implemented - workouts list page</div>}
              />
              <Route
                path={WorkoutsPath.Workout}
                element={<div>Not implemented - workout page</div>}
              />
            </Route>
          </Route>
          <Route path="*" element={<div>Not implemented - 404 page</div>} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
