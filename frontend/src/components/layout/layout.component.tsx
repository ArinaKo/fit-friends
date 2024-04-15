import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <Fragment>
      <div>Not implemented - layout</div>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default Layout;
