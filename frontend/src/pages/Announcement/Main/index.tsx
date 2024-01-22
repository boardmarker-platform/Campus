import { Suspense } from 'react';

import { IS_DESKTOP } from 'constants/viewport';
import Skeleton from 'pages/Announcement/Main/Skeleton';

import AnnouncementWithInfiniteScroll from 'components/AnnouncementWithInfiniteScroll';
import AnnouncementWithPagination from 'components/AnnouncementWithPagination';
import ErrorBoundary from 'components/ErrorBoundary';

export default function Main() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Skeleton />}>
        {IS_DESKTOP ? <AnnouncementWithPagination /> : <AnnouncementWithInfiniteScroll />}
      </Suspense>
    </ErrorBoundary>
  );
}
