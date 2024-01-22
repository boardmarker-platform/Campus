import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { ROUTES } from 'constants/routes';

type Props = {
  status: unknown;
};

export const useError = (status: unknown) => {
  const [message, setMessage] = useState('예기치 못한 오류가 발생했습니다');
  const [route, setRoute] = useState(ROUTES.home.path);
  const [routeDescription, setRouteDescription] = useState('홈으로 돌아가기');
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    if (status === 401) {
      setMessage('잘못된 패스워드입니다');
      setIsReload(true);
    }
  }, [status]);

  return { message, route, routeDescription, isReload };
};

export default function ErrorElement({ status }: Props) {
  const { message, route, routeDescription, isReload } = useError(status);

  return (
    <S.Layout>
      <S.Title>{message}</S.Title>
      <S.Link to={route} reloadDocument={isReload}>
        {routeDescription}
      </S.Link>
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
