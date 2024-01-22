import { HttpResponse, http } from 'msw';

import { REQUEST_URL } from 'constants/url';
import { attendanceList, authorization } from 'mocks/data/attendance';

export const attendanceHandlers = [
  // 출석 등록
  http.post(REQUEST_URL.attendances, ({ request }) => {
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    return HttpResponse.json(
      {
        status: 'attendance',
      },
      { status: 200 },
    );
  }),

  // 출석 현황 조회
  http.get(`${REQUEST_URL.attendances}`, ({ request }) => {
    // const url = new URL(request.url);
    // const from = url.searchParams.get('from');
    // const to = url.searchParams.get('to');
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    return HttpResponse.json(attendanceList);
  }),
];
