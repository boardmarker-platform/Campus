import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { ROUTES } from 'constants/routes';

export default function NotFound() {
  return (
    <S.Layout>
      <S.Title>잘못된 페이지입니다</S.Title>
      <S.Link to={ROUTES.home.path}>홈으로 돌아가기</S.Link>
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    height: 100%;
  `,

  Title: styled.h1`
    font-size: 6rem;
  `,

  Link: styled(Link)`
    padding: 20px;
    border-radius: 4px;

    font-size: 3.2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    &:visited,
    &:active {
      color: ${({ theme }) => theme.colors.text};
    }
  `,
};
