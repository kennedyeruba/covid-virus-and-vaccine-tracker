import React, { lazy, Suspense } from 'react';

const LazyCovidView = lazy(() => import('./CovidView'));

const CovidView = props => (
  <Suspense fallback={null}>
    <LazyCovidView {...props} />
  </Suspense>
);

export default CovidView;
