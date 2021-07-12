import React, { lazy, Suspense } from 'react';

const LazyCovidChart = lazy(() => import('./CovidChart'));

const CovidChart = props => (
  <Suspense fallback={null}>
    <LazyCovidChart {...props} />
  </Suspense>
);

export default CovidChart;
