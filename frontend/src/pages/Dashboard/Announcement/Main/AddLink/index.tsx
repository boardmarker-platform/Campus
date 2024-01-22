import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import PlusIcon from 'assets/svg/plus.svg';
import { ROUTES } from 'constants/routes';

export default function AddLink() {
  return (
    <S.AddLink to={ROUTES.dashboard.announcement.editor.path}>
      <PlusIcon fill='#ffffff' />
    </S.AddLink>
  );
}

const S = {
  AddLink: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 60px;
    height: 60px;
    padding: 16px;
    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.primary};
  `,
};
