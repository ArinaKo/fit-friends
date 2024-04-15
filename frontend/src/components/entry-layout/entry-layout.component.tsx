import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function EntryLayout(): JSX.Element {
  return (
    <Fragment>
      <div>Not implemented - entry layout</div>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default EntryLayout;
