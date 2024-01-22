import styled from '@emotion/styled';

import AnnouncementList from 'components/AnnouncementList';
import Pagination from 'components/Pagination';

import { useAnnouncementWithPagination } from './useAnnouncementWithPagination';

type Props = {
  isDashboard?: boolean;
};

export default function AnnouncementWithPagination({ isDashboard = false }: Props) {
  const { announcementList, page, totalPage, isEmpty, changeCurrentPage } =
    useAnnouncementWithPagination();

  return (
    <S.Container>
      <AnnouncementList
        announcementList={announcementList}
        isEmpty={isEmpty}
        isDashboard={isDashboard}
      />
      <Pagination currentPage={page} totalPage={totalPage} changeCurrentPage={changeCurrentPage} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
  `,
};
