import { useState } from 'react';

export const useAuthentication = () => {
  // 인증방식 수정 필요
  const auth = sessionStorage.getItem('authAnnouncement') === 'Basic MTIzNA==';
  const [isAuthenticate] = useState(auth);

  return isAuthenticate;
};
