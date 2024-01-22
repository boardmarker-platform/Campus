import { useSuspenseQuery } from '@tanstack/react-query';

import { getAnnouncementContent } from 'apis/announcement';
import { GetAnnouncementContentResponse } from 'type/announcement';
import { parseCreatedAt } from 'utils/time';

export const useAnnouncementContent = (announcementId: number) => {
  const {
    data: announcement,
    isLoading,
    isError,
  } = useSuspenseQuery<GetAnnouncementContentResponse>({
    queryKey: ['announcement'],
    queryFn: () => getAnnouncementContent({ announcementId }),
  });
  const { date, time } = parseCreatedAt(announcement.createdAt);

  return {
    author: announcement.author,
    slackChannel: announcement.slackChannel,
    date,
    time,
    title: announcement.title,
    content: announcement.content,
    isLoading,
    isError,
  };
};
