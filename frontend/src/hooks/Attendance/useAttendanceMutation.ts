import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { attendance as attendanceAPI } from 'apis/attendance';

export const useAttendanceMutation = () => {
  const queryClient = useQueryClient();
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const { mutate: postAttendance } = useMutation({
    mutationFn: attendanceAPI,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      if (data.status === 'attendance') setAttendanceStatus('등교 처리 되었습니다.');
    },
  });

  return { postAttendance, attendanceStatus };
};
