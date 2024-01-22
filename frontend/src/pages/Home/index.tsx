import { FormEventHandler } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { ROUTES } from 'constants/routes';

import { useAuthentication } from 'hooks/useAuthentication';

import Button from 'components/Button';

export default function Home() {
  const isAuthenticate = useAuthentication();
  const navigate = useNavigate();

  const storePassword: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const input = formData.get('password');
    sessionStorage.setItem('authAnnouncement', `Basic ${btoa(String(input))}`);

    navigate(ROUTES.announcement.path);
  };

  if (isAuthenticate) return <Navigate to={ROUTES.announcement.path} />;

  return (
    <S.Wrapper>
      <S.Form onSubmit={storePassword}>
        <S.Container>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' name='password' />
        </S.Container>
        <Button type='submit' size='small'>
          로그인
        </Button>
      </S.Form>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    font-size: 2rem;
  `,

  Container: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
};
