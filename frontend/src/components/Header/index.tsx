import styled from '@emotion/styled';

import MenuList from './MenuList';
import Title from './Title';

export default function Header() {
  return (
    <S.Header>
      <Title />
      <MenuList />
    </S.Header>
  );
}

const S = {
  Header: styled.header`
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    gap: 120px;
    height: 80px;
    padding: 0 80px;

    background-color: ${({ theme }) => theme.colors.primary};
  `,
};
