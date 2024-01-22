import { useState } from 'react';

export const useModal = (isInitialOpen = false) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
