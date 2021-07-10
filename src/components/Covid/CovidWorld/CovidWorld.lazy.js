import React, { lazy, Suspense } from 'react';

const LazyCovidWorld = lazy(() => import('./CovidWorld'));

const CovidWorld = props => (
  <Suspense fallback={null}>
    <LazyCovidWorld {...props} />
  </Suspense>
);

export default CovidWorld;
