import { Outlet } from 'react-router-dom';

function EntryLayout(): JSX.Element {
  return (
    <div className="wrapper">
      <main data-testid="mainElement">
        <div className="background-logo" data-testid="backgroundLogo">
          <svg
            className="background-logo__logo"
            width={750}
            height={284}
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big" />
          </svg>
          <svg
            className="background-logo__icon"
            width={343}
            height={343}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype" />
          </svg>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default EntryLayout;
