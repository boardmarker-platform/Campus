export type AnnouncementItem = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  slackChannel: string;
};

export type GetAnnouncementListWithPaginationRequest = {
  page: number;
  size: number;
};

export type GetAnnouncementListWithPaginationResponse = {
  announcements: AnnouncementItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetAnnouncementListWithInfiniteScrollRequest = {
  id: number | null;
  size: number;
};

export type GetAnnouncementListWithInfiniteScrollResponse = {
  announcements: AnnouncementItem[];
  hasNext: boolean;
  lastCursorId: number;
};

export type GetAnnouncementContentRequest = {
  announcementId: number;
};

export type GetAnnouncementContentResponse = Omit<AnnouncementItem, 'id'>;

export type AddAnnouncementContentRequest = {
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  author: FormDataEntryValue | null;
  slackChannel: FormDataEntryValue | null;
};

export type EditData = Omit<AddAnnouncementContentRequest, 'slackChannel'>;

export type EditAnnouncementContentRequest = {
  announcementId: number;
  data: EditData;
};

export type DeleteAnnouncementContentRequest = {
  announcementId: number;
};
