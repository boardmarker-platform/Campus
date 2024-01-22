import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { ROUTES } from 'constants/routes';

type Props = {
  id: number;
  title: string;
};

export default function Title({ id, title }: Props) {
  return (
    <S.Link to={ROUTES.announcement.content.getAbsolutePathWithId(id)}>
      <S.Title>{title}</S.Title>
    </S.Link>
  );
}

const S = {
  Link: styled(Link)`
    &:visited,
    &:active,
    &:hover {
      color: ${({ theme }) => theme.colors.button.text};
    }
  `,

  Title: styled.h2`
    font-size: 2.8rem;
  `,
};
