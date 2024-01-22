import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { ROUTES } from 'constants/routes';

type Props = {
  id: number;
};

export default function EditLink({ id }: Props) {
  return (
    <S.Link to={ROUTES.dashboard.announcement.editor.path} state={id}>
      수정
    </S.Link>
  );
}

const S = {
  Link: styled(Link)`
    ${({ theme }) => theme.size.button.medium}
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.button.primary};

    &:visited,
    &:active,
    &:hover {
      color: ${({ theme }) => theme.colors.button.secondary};
    }
  `,
};
