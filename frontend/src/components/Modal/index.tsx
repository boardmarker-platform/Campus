import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
} & PropsWithChildren;

export default function Modal({ isOpen = false, closeModal, children }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <S.Section>
      <S.Backdrop onClick={closeModal} />
      <S.Content>{children}</S.Content>,
    </S.Section>,
    document.body,
  );
}

const S = {
  Section: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
  `,

  Backdrop: styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.4;

    background-color: ${({ theme }) => theme.colors.modal.backdrop};
  `,

  Content: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 30rem;
    height: 20rem;

    background-color: ${({ theme }) => theme.colors.modal.content};
  `,
};
