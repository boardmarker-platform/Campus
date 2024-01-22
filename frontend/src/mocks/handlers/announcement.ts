import { HttpResponse, delay, http } from 'msw';

import { SIZE_PER_PAGE, SIZE_PER_SCROLL } from 'constants/announcement';
import { REQUEST_URL } from 'constants/url';
import {
  announcementContent,
  announcementList,
  authorization,
  newAnnouncementContent,
} from 'mocks/data/announcement';
import {
  GetAnnouncementContentResponse,
  GetAnnouncementListWithInfiniteScrollResponse,
  GetAnnouncementListWithPaginationResponse,
} from 'type/announcement';

export const announcementHandlers = [
  // 공지 목록 조회 (페이지네이션)
  http.get(`${REQUEST_URL.announcements}/offset`, async ({ request }) => {
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    const { searchParams } = new URL(request.url);
    const pageNum = searchParams.get('page') ?? 0;
    const sizePerPage = searchParams.get('size') ?? SIZE_PER_PAGE;

    const page = Number(pageNum);
    const size = Number(sizePerPage);
    const announcements = announcementList.slice(page * size, (page + 1) * size);
    const totalElements = announcementList.length;
    const totalPages = Math.ceil(totalElements / size);

    await delay(1000);

    return HttpResponse.json<GetAnnouncementListWithPaginationResponse>(
      { announcements, page, size, totalElements, totalPages },
      {
        status: 200,
      },
    );
  }),

  // 공지 목록 조회 (무한스크롤)
  http.get(`${REQUEST_URL.announcements}/cursor`, async ({ request }) => {
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id') !== 'null' ? searchParams.get('id') : 1);
    const size = Number(searchParams.get('size') ?? SIZE_PER_SCROLL);
    const start = id - 1;
    const end = id + size;
    const announcements = announcementList.slice(start, end - 1);
    const hasNext = announcementList.length > end;
    const lastCursorId = end;

    await delay(1000);

    return HttpResponse.json<GetAnnouncementListWithInfiniteScrollResponse>(
      {
        announcements,
        hasNext,
        lastCursorId,
      },
      {
        status: 200,
      },
    );
  }),

  // 공지 조회
  http.get(`${REQUEST_URL.announcements}/:announcementId`, async ({ params, request }) => {
    const { announcementId } = params;
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    await delay(1000);

    if (announcementId === '20')
      return HttpResponse.json<GetAnnouncementContentResponse>(newAnnouncementContent, {
        status: 200,
      });

    return HttpResponse.json<GetAnnouncementContentResponse>(announcementContent, {
      status: 200,
    });
  }),

  // 공지 게시
  http.post(REQUEST_URL.announcements, async ({ request }) => {
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    await delay(1000);

    return new HttpResponse(null, {
      status: 201,
      headers: {
        Location: '/api/announcements/20',
      },
    });
  }),

  // 공지 수정
  http.patch(`${REQUEST_URL.announcements}/:announcementId`, async ({ request }) => {
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    await delay(1000);

    return new HttpResponse(null, {
      status: 200,
    });
  }),

  // 공지 삭제
  http.delete(`${REQUEST_URL.announcements}/:announcementId`, async ({ request }) => {
    const clientAuthorization = request.headers.get('Authorization');

    if (authorization !== clientAuthorization) return HttpResponse.error();

    await delay(1000);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
