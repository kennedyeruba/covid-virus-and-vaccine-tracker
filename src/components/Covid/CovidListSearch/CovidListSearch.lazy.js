import React, { lazy, Suspense } from 'react';

const LazyCovidListSearch = lazy(() => import('./CovidListSearch'));

const CovidListSearch = props => (
  <Suspense fallback={null}>
    <LazyCovidListSearch {...props} />
  </Suspense>
);

export default CovidListSearch;
