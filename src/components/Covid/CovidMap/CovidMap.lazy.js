import React, { lazy, Suspense } from 'react';

const LazyCovidMap = lazy(() => import('./CovidMap'));

const CovidMap = props => (
  <Suspense fallback={null}>
    <LazyCovidMap {...props} />
  </Suspense>
);

export default CovidMap;
