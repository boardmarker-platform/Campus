import { REQUEST_URL } from 'constants/url';
import { GetAttendanceListRequest, GetAttendanceListResponse } from 'type/attendance';

import { http } from './fetch';

const generateOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('authAttendance'),
    },
  };
};

export const attendance = async () => {
  return await http.post(`${REQUEST_URL.attendances}`, null, generateOptions());
};

export const getAttendanceList = async ({
  from,
  to,
}: GetAttendanceListRequest): Promise<GetAttendanceListResponse> => {
  const response = await http.get(
    `${REQUEST_URL.attendances}?from=${from}&to=${to}`,
    generateOptions(),
  );

  return response.data;
};
