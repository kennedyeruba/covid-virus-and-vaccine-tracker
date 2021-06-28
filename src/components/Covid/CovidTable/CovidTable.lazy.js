import React, { lazy, Suspense } from 'react';

const LazyCovidTable = lazy(() => import('./CovidTable'));

const CovidTable = props => (
  <Suspense fallback={null}>
    <LazyCovidTable {...props} />
  </Suspense>
);

export default CovidTable;
