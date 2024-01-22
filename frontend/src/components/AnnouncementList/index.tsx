import styled from '@emotion/styled';

import { AnnouncementItem } from 'type/announcement';

import DeleteButton from './DeleteButton';
import EditLink from './EditLink';
import Empty from './Empty';
import Information from './Information';
import Title from './Title';

type Props = {
  announcementList: AnnouncementItem[];
  isEmpty: boolean;
  isDashboard: boolean;
};

export default function AnnouncementList({ announcementList, isEmpty, isDashboard }: Props) {
  if (isEmpty) return <Empty />;

  return (
    <S.List>
      {announcementList.map(({ id, title, author, slackChannel, createdAt }) => {
        return (
          <S.Item key={id}>
            <S.ContentContainer>
              <Title id={id} title={title} />
              <Information author={author} slackChannel={slackChannel} createdAt={createdAt} />
            </S.ContentContainer>
            {isDashboard && (
              <S.ActionContainer>
                <EditLink id={id} />
                <DeleteButton id={id} />
              </S.ActionContainer>
            )}
          </S.Item>
        );
      })}
    </S.List>
  );
}

const S = {
  List: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  `,

  Item: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 120px;
    padding: 24px 32px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
  `,

  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  `,

  ActionContainer: styled.div`
    display: flex;
    gap: 16px;
  `,
};
