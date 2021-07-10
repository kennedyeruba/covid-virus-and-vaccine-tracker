import React, { lazy, Suspense } from 'react';

const LazyCovidList = lazy(() => import('./Covid/CovidList'));

const CovidList = props => (
  <Suspense fallback={null}>
    <LazyCovidList {...props} />
  </Suspense>
);

export default Covid/CovidList;
