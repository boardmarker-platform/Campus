import { announcementHandlers } from './handlers/announcement';
import { attendanceHandlers } from './handlers/attendance';

export const handlers = [...announcementHandlers, ...attendanceHandlers];
