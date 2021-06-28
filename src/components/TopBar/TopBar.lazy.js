import React, { lazy, Suspense } from 'react';

const LazyTopBar = lazy(() => import('./TopBar'));

const TopBar = props => (
  <Suspense fallback={null}>
    <LazyTopBar {...props} />
  </Suspense>
);

export default TopBar;
