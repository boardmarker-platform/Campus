import { Outlet } from 'react-router-dom';

import styled from '@emotion/styled';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

export default function App() {
  return (
    <ErrorBoundary>
      <S.Layout>
        <Header />
        <S.Content>
          <Outlet />
        </S.Content>
      </S.Layout>
    </ErrorBoundary>
  );
}

const S = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,

  Content: styled.section`
    display: flex;
    flex: 1;
    padding: 40px 20%;

    @media (max-width: 1023px) {
      padding: 40px 10%;
    }

    @media (max-width: 424px) {
      padding: 40px 0;
    }

    background-color: ${({ theme }) => theme.colors.background};
  `,
};
