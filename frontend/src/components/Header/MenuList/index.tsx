import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { useMenuList } from './useMenuList';

export default function MenuList() {
  const menuList = useMenuList();

  return (
    <S.MenuList>
      {menuList.map((menu) => {
        return (
          <S.MenuItem key={menu.title} isFocus={menu.isFocus}>
            <S.Link to={menu.path}>
              <p>{menu.title}</p>
            </S.Link>
          </S.MenuItem>
        );
      })}
    </S.MenuList>
  );
}

const S = {
  MenuList: styled.ul`
    display: flex;
    gap: 60px;
    align-items: last baseline;
    height: 100%;
  `,

  MenuItem: styled.li<{ isFocus: boolean }>`
    flex-shrink: 0;
    padding: 12px 12px 32px;
    border-radius: 8px 8px 0 0;

    font-size: 2rem;
    background-color: ${({ theme, isFocus }) => isFocus && theme.colors.background};

    p {
      color: ${({ theme, isFocus }) => isFocus && theme.colors.primary};
    }
  `,

  Link: styled(Link)`
    &:visited,
    &:active,
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  `,
};
