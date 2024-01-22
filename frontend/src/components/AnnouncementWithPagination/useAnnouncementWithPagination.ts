import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getAnnouncementListWithPagination } from 'apis/announcement';
import { SIZE_PER_PAGE } from 'constants/announcement';
import { GetAnnouncementListWithPaginationResponse } from 'type/announcement';

// 페이지는 0번부터 시작
const START_PAGE_INDEX = 0;

export const useAnnouncementWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(START_PAGE_INDEX);
  const {
    data: { announcements, page, size, totalPages, totalElements },
  } = useSuspenseQuery<GetAnnouncementListWithPaginationResponse>({
    queryKey: ['announcementList', currentPage],
    queryFn: () => getAnnouncementListWithPagination({ page: currentPage, size: SIZE_PER_PAGE }),
  });

  const changeCurrentPage = (page: number) => setCurrentPage(page);

  return {
    page,
    size,
    announcementList: announcements,
    totalPage: totalPages,
    isEmpty: !totalElements,
    changeCurrentPage,
  };
};
