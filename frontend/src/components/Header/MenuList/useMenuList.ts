import { useLocation } from 'react-router-dom';

import { ROUTES } from 'constants/routes';

export const useMenuList = () => {
  const { pathname } = useLocation();
  const menuList = [
    {
      title: ROUTES.announcement.title,
      path: ROUTES.announcement.path,
      isFocus:
        pathname.includes(ROUTES.announcement.path) && !pathname.includes(ROUTES.dashboard.path),
    },
    {
      title: ROUTES.attendance.title,
      path: ROUTES.attendance.path,
      isFocus:
        pathname.includes(ROUTES.attendance.path) && !pathname.includes(ROUTES.dashboard.path),
    },
    {
      title: ROUTES.dashboard.title,
      path: ROUTES.dashboard.path,
      isFocus: pathname.includes(ROUTES.dashboard.path),
    },
  ];

  return menuList;
};
