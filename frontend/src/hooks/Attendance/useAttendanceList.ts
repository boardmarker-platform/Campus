import { useSuspenseQuery } from '@tanstack/react-query';

import { getAttendanceList } from 'apis/attendance';

export const useAttendanceList = (from: string = '', to: string = '') => {
  const { data } = useSuspenseQuery({
    queryKey: ['attendance'],
    queryFn: () => getAttendanceList({ from, to }),
  });

  return { attendanceList: data.attendances };
};
