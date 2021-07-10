import React, { lazy, Suspense } from 'react';

const LazyCovidUser = lazy(() => import('./CovidUser'));

const CovidUser = props => (
  <Suspense fallback={null}>
    <LazyCovidUser {...props} />
  </Suspense>
);

export default CovidUser;
