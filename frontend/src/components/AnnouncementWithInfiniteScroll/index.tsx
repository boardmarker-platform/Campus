import styled from '@emotion/styled';

import AnnouncementList from 'components/AnnouncementList';

import { useAnnouncementWithInfiniteScroll } from './useAnnouncementWithInfiniteScroll';

type Props = {
  isDashboard?: boolean;
};

export default function AnnouncementWithInfiniteScroll({ isDashboard = false }: Props) {
  const { announcementList, isEmpty, ref } = useAnnouncementWithInfiniteScroll();

  return (
    <S.Container>
      <AnnouncementList
        announcementList={announcementList}
        isEmpty={isEmpty}
        isDashboard={isDashboard}
      />
      <S.Target ref={ref} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,

  Target: styled.div`
    height: 1px;
  `,
};
