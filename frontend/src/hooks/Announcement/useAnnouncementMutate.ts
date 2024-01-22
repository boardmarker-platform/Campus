import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteAnnouncementContent,
  editAnnouncementContent,
  addAnnouncementContent,
} from 'apis/announcement';
import { ROUTES } from 'constants/routes';
import { AddAnnouncementContentRequest, EditData } from 'type/announcement';

export const useAnnouncementMutate = (announcementId: number = 0) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editAnnouncementContentMutate } = useMutation({
    mutationFn: (data: EditData) => editAnnouncementContent({ announcementId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcementList'] });
      const url = `/announcement/${announcementId}`;

      navigate(url);
    },
  });

  const { mutate: addAnnouncementContentMutate } = useMutation({
    mutationFn: (data: AddAnnouncementContentRequest) => addAnnouncementContent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcementList'] });

      navigate(`/${ROUTES.announcement.path}`);
    },
  });

  const { mutate: deleteAnnouncementContentMutate } = useMutation({
    mutationFn: deleteAnnouncementContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcementList'] });
    },
  });

  return {
    editAnnouncementContentMutate,
    addAnnouncementContentMutate,
    deleteAnnouncementContentMutate,
  };
};
