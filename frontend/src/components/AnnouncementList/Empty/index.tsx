import styled from '@emotion/styled';

export default function Empty() {
  return (
    <S.Container>
      <S.Title>🥲</S.Title>
      <S.Title>공지사항이 없어요</S.Title>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Title: styled.h1`
    font-size: 5.2rem;
  `,
};
