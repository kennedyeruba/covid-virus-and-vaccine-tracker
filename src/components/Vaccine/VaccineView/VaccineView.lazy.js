import React, { lazy, Suspense } from 'react';

const LazyVaccineView = lazy(() => import('./VaccineView'));

const VaccineView = props => (
  <Suspense fallback={null}>
    <LazyVaccineView {...props} />
  </Suspense>
);

export default VaccineView;
