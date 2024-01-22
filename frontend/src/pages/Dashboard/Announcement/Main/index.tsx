import { Suspense } from 'react';

import { IS_DESKTOP } from 'constants/viewport';

import AnnouncementWithInfiniteScroll from 'components/AnnouncementWithInfiniteScroll';
import AnnouncementWithPagination from 'components/AnnouncementWithPagination';

import AddLink from './AddLink';
import Skeleton from './Skeleton';

export default function Main() {
  return (
    <Suspense fallback={<Skeleton />}>
      {IS_DESKTOP ? <AnnouncementWithPagination /> : <AnnouncementWithInfiniteScroll />}
      <AddLink />
    </Suspense>
  );
}
