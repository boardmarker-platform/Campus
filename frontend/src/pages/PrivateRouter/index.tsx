import { Outlet } from 'react-router-dom';

import { useAuthentication } from 'hooks/useAuthentication';

export default function PrivateRouter() {
  const isAuthenticate = useAuthentication();

  if (!isAuthenticate) {
    throw new Error('잘못된 로그인입니다', {
      cause: 401,
    });
  }

  return <Outlet />;
}
