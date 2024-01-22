type attendance = {
  date: Date;
  status: string;
};

export type GetAttendanceListRequest = {
  from: string;
  to: string;
};

export type GetAttendanceListResponse = {
  attendances: attendance[];
};
