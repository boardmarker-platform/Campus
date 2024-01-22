import { Suspense } from 'react';

import AnnouncementContent from 'components/AnnouncementContent';
import ErrorBoundary from 'components/ErrorBoundary';

import Skeleton from './Skeleton';

export default function Content() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Skeleton />}>
        <AnnouncementContent />
      </Suspense>
    </ErrorBoundary>
  );
}
