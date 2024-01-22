import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import { useAnnouncementContent } from 'hooks/Announcement/useAnnouncementContent';

export default function AnnouncementContent() {
  const { announcementId } = useParams();
  const { author, slackChannel, date, time, title, content } = useAnnouncementContent(
    Number(announcementId),
  );

  return (
    <S.Container>
      <S.InformationContainer>
        <S.InformationFont>{slackChannel}</S.InformationFont>
        <S.InformationFont>{author}</S.InformationFont>
        <S.DateContainer>
          <S.InformationFont>{date}</S.InformationFont>
          <S.InformationFont>{time}</S.InformationFont>
        </S.DateContainer>
      </S.InformationContainer>
      <S.Title>{title}</S.Title>
      <S.Article>{content}</S.Article>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
  `,

  InformationContainer: styled.div`
    display: flex;
    flex-shrink: 0;
    gap: 16px;

    & > * {
      padding: 16px 24px;
      background-color: ${({ theme }) => theme.colors.contentWrapper};
    }
  `,

  DateContainer: styled.div`
    display: flex;
    gap: 12px;
  `,

  InformationFont: styled.p`
    font-size: 1.6rem;
  `,

  Title: styled.h1`
    flex-shrink: 0;
    padding: 24px 32px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
    font-size: 3.6rem;
  `,

  Article: styled.article`
    flex: 1;
    padding: 24px 32px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
    font-size: 2rem;
  `,
};
