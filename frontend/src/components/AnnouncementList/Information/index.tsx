import styled from '@emotion/styled';

import { parseCreatedAt } from 'utils/time';

type Props = {
  slackChannel: string;
  author: string;
  createdAt: string;
};

export default function Information({ slackChannel, author, createdAt }: Props) {
  const { date, time } = parseCreatedAt(createdAt);

  return (
    <S.InfoContainer>
      <p>{slackChannel}</p>
      <S.Round />
      <p>{author}</p>
      <S.Round />
      <p>{date}</p>
      <p>{time}</p>
    </S.InfoContainer>
  );
}

const S = {
  InfoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    color: ${({ theme }) => theme.colors.infoText};
    font-size: 1.6rem;

    & > p {
      cursor: default;
    }
  `,

  Round: styled.div`
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.infoText};
  `,
};
