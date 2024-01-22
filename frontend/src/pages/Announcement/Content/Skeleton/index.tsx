import styled from '@emotion/styled';

export default function Skeleton() {
  return (
    <S.Container>
      <S.InformationContainer>
        <S.InformationFont />
        <S.InformationFont />
        <S.DateContainer>
          <S.InformationFont />
          <S.InformationFont />
        </S.DateContainer>
      </S.InformationContainer>
      <S.Title />
      <S.Article />
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
  `,

  DateContainer: styled.div`
    display: flex;
    gap: 12px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
  `,

  InformationFont: styled.div`
    width: 80px;
    height: 48px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
  `,

  Title: styled.div`
    flex-shrink: 0;
    width: 100%;
    height: 80px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
  `,

  Article: styled.div`
    flex: 1;
    padding: 24px 32px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
    font-size: 2rem;
  `,
};
