import { REQUEST_URL } from 'constants/url';
import {
  AddAnnouncementContentRequest,
  EditAnnouncementContentRequest,
  GetAnnouncementListWithPaginationRequest,
  GetAnnouncementListWithPaginationResponse,
  GetAnnouncementContentResponse,
  GetAnnouncementContentRequest,
  DeleteAnnouncementContentRequest,
  GetAnnouncementListWithInfiniteScrollRequest,
} from 'type/announcement';

import { http } from './fetch';

const generateOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('authAnnouncement'),
    },
  };
};

export const getAnnouncementListWithPagination = async ({
  page,
  size,
}: GetAnnouncementListWithPaginationRequest): Promise<GetAnnouncementListWithPaginationResponse> => {
  const response = await http.get(
    `${REQUEST_URL.announcements}/offset?page=${page}&size=${size}`,
    generateOptions(),
  );

  return response.data;
};

export const getAnnouncementListWithInfiniteScroll = async ({
  id,
  size,
}: GetAnnouncementListWithInfiniteScrollRequest) => {
  const response = await http.get(
    `${REQUEST_URL.announcements}/cursor?id=${id}&size=${size}`,
    generateOptions(),
  );

  return response.data;
};

export const getAnnouncementContent = async ({
  announcementId,
}: GetAnnouncementContentRequest): Promise<GetAnnouncementContentResponse> => {
  const response = await http.get(
    `${REQUEST_URL.announcements}/${announcementId}`,
    generateOptions(),
  );

  return response.data;
};

export const editAnnouncementContent = async ({
  announcementId,
  data,
}: EditAnnouncementContentRequest) => {
  return await http.patch(
    `${REQUEST_URL.announcements}/${announcementId}`,
    JSON.stringify(data),
    generateOptions(),
  );
};

export const addAnnouncementContent = async ({
  title,
  content,
  author,
  slackChannel,
}: AddAnnouncementContentRequest) => {
  return await http.post(
    `${REQUEST_URL.announcements}`,
    JSON.stringify({
      title,
      content,
      author,
      slackChannel,
    }),
    generateOptions(),
  );
};

export const deleteAnnouncementContent = async ({
  announcementId,
}: DeleteAnnouncementContentRequest) => {
  return await http.delete(`${REQUEST_URL.announcements}/${announcementId}`, generateOptions());
};
