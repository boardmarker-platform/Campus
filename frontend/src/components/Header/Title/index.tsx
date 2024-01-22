import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import MascotIcon from 'assets/svg/mascot.svg';
import { ROUTES } from 'constants/routes';

export default function Title() {
  return (
    <S.Link to={ROUTES.home.path}>
      <S.TitleContainer>
        <MascotIcon />
        <S.Title>{ROUTES.home.title}</S.Title>
      </S.TitleContainer>
    </S.Link>
  );
}

const S = {
  Link: styled(Link)`
    &:visited,
    &:active,
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  `,

  TitleContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  Title: styled.h1`
    font-size: 3.2rem;
  `,
};
