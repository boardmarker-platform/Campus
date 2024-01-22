const VALID_NICKNAME = 'Aker';

export const authorization = `Basic ${btoa(VALID_NICKNAME)}`;

export const attendanceList = {
  attendances: [
    {
      date: '2023-12-21' as unknown as Date,
      status: 'attendance',
    },
    {
      date: '2023-12-22' as unknown as Date,
      status: 'tardiness',
    },
  ],
};
