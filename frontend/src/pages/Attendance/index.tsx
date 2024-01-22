import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';

export default function Attendance() {
  return (
    <ErrorBoundary fallback={<div>출석 페이지 오류</div>}>
      <Suspense fallback={<div>출석 페이지 로딩 중 ...</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
