import React, { lazy, Suspense } from 'react';

const LazyVaccineTable = lazy(() => import('./VaccineTable'));

const VaccineTable = props => (
  <Suspense fallback={null}>
    <LazyVaccineTable {...props} />
  </Suspense>
);

export default VaccineTable;
